import * as vscode from 'vscode';

export class TasksflowConfig {

    static getAccessToken(gitProviderId: string): string {
        let config = vscode.workspace.getConfiguration();
        return config.tasksflow.accessToken[gitProviderId];
    }


}