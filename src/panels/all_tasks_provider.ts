import { Event, ProviderResult, TreeDataProvider, TreeItem } from "vscode";
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { GitRepository } from "../repositories/git_repository/git_repository";
import { GitProvider } from '../repositories/git_providers/git_provider';
import { Issue } from '../repositories/issue';

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
            return new Task(issue.title!);
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
            /*const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

            const toDep = (moduleName: string, version: string): Task => {
                if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
                    return new Task(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
                } else {
                    return new Task(moduleName, version, vscode.TreeItemCollapsibleState.None, {
                        command: 'extension.openPackageOnNpm',
                        title: '',
                        arguments: [moduleName]
                    });
                }
            };

            const deps = packageJson.dependencies
                ? Object.keys(packageJson.dependencies).map(dep => toDep(dep, packageJson.dependencies[dep]))
                : [];
            const devDeps = packageJson.devDependencies
                ? Object.keys(packageJson.devDependencies).map(dep => toDep(dep, packageJson.devDependencies[dep]))
                : [];*/
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
    ) {
        super(label);

        this.tooltip = `${this.label}`;
    }

    iconPath = {
        light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
        dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    };

    contextValue = 'dependency';
}