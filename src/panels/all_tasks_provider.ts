import { Event, ProviderResult, TreeDataProvider, TreeItem } from "vscode";
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { GitRepository } from "../repositories/git_repository/git_repository";
import { GitProvider } from '../repositories/git_providers/git_provider';
import { Issue } from '../repositories/issue';
import { start } from "repl";

export class AllTasksProvider<T> implements TreeDataProvider<Task>{

    constructor() {
    }

    getTreeItem(element: Task): TreeItem {
        return element;
    }

    private _onDidChangeTreeData: vscode.EventEmitter<Task | undefined | void> = new vscode.EventEmitter<Task | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<Task | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getChildren(element?: Task): ProviderResult<Task[]> {

        if (element) {
            return Promise.resolve([]);

        } else {
            return Promise.resolve(this.getAllTasks());
            /*
            return Promise.resolve(this.getDepsInPackageJson(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json')));
            */
        }
    }

    private async getAllTasks(): Promise<Task[]> {

        const toTask = (issue: Issue): Task => {
            return new Task(issue.title!, issue.body!, { command: "tasksflow.seeTask", title: "", arguments: [issue] });
        };

        let gitRepo = new GitRepository();
        await gitRepo.init();
        let gitProvider = new GitProvider(gitRepo);
        let allIssues = await gitProvider.getAllIssuesList();
        const tasks = allIssues.map(issue => toTask(issue));
        return tasks;
    }

    private getDepsInPackageJson(packageJsonPath: string): Task[] {
        if (this.pathExists(packageJsonPath)) {
            return [];
        } else {
            return [];
        }
    }

    private pathExists(p: string): boolean {
        try {
            fs.accessSync(p);
        } catch (err) {
            return false;
        }

        return true;
    }

}

export class Task extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        public readonly tooltip: string,
        public readonly command: vscode.Command,
    ) {

        super(label,);
        this.tooltip = tooltip;
    }

    iconPath = {
        light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
        dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    };



    contextValue = 'dependency';
}