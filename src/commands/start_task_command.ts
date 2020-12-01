import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from "vscode";
import { GitRepository } from "../repositories/git_repository/git_repository";
import { GitProvider } from "../repositories/git_providers/git_provider";
import { Issue } from '../repositories/issue';
const git: SimpleGit = simpleGit(vscode.workspace.rootPath);

export async function startTaskCommand(issue: Issue) {
    vscode.window.showInformationMessage(`Starting to work on the task number ${issue.number}!`);
    const panel = vscode.window.createWebviewPanel("taskView", `Taskflow - Task ${issue.number}`, vscode.ViewColumn.One, {});
    panel.webview.html = getWebviewContent(issue);
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
