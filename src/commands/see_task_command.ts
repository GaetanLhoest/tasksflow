import * as vscode from "vscode";
import { Panels } from "../extension";
import { Issue } from '../repositories/issue';

export async function seeTaskCommand(issue: Issue) {

    const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

    if (Panels.startTaskPanel) {
        Panels.startTaskPanel.title = `Taskflow - Task ${issue.number}`;
        Panels.startTaskPanel.reveal(columnToShowIn);
    } else {
        Panels.startTaskPanel = vscode.window.createWebviewPanel("taskView", `Taskflow - Task ${issue.number}`, vscode.ViewColumn.One, { enableScripts: true, });

    }
    Panels.startTaskPanel.webview.html = getWebviewContent(issue);
    Panels.startTaskPanel.webview.onDidReceiveMessage(message => {
        switch (message.command) {
            case "start":
                console.log(`Start working on task ${issue}`);
        }
    });
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
      <button onclick=startTask()">Start working on this task</button>
      <h1>${issue.title}</h1>
      <p>${issue.bodyHTML}</p>
  </body>
  <script>
  const vscode = acquireVsCodeApi();
  function startTask(){
    vscode.postMessage({command: 'start'})
  }
  </script>
  </html>`;
}
