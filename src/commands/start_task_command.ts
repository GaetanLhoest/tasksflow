import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from "vscode";
import { WebviewPanel } from "vscode";
import { Panels } from "../extension";
import { Issue } from '../repositories/issue';
const git: SimpleGit = simpleGit(vscode.workspace.rootPath);

export async function startTaskCommand(issue: Issue) {

    const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

    if (Panels.startTaskPanel) {
        Panels.startTaskPanel.title = `Taskflow - Task ${issue.number}`;
        Panels.startTaskPanel.reveal(columnToShowIn);
    } else {
        Panels.startTaskPanel = vscode.window.createWebviewPanel("taskView", `Taskflow - Task ${issue.number}`, vscode.ViewColumn.One, {});

    }
    Panels.startTaskPanel.webview.html = getWebviewContent(issue);

    /*let issueId;
    issueId = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "E.g. 25",
        prompt: "Id of the issue",
    });

    let gitRepo = new GitRepository();
    await gitRepo.init();
    let gitRepoUrl = gitRepo.gitUrl;
    console.log(gitRepoUrl);
    let gitProvider = new GitProvider(gitRepo);
    console.log(issue);*/
    //TODO work here
}

function getWebviewContent(issue: Issue) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>
      <h1>${issue.title}</h1>
      <p>${issue.body}</p>
  </body>
  </html>`;
}
