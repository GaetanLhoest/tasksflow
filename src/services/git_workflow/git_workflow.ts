import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from 'vscode';

export class GitWorkflow {

    git: SimpleGit;

    constructor() {
        this.git = simpleGit(vscode.workspace.rootPath);
    }

    async startTask(branchName: string, bug: boolean = false) {
        /*workflow
        * Check if changes need to be stached
        * Rebase develop on origin/develop
        * Create new branch and check it out
        */
        let gitStatus = await this.git.status();

        await

            await this.git.checkout(["-b", branchName, "develop"]);
        console.log("plop");
    }

}