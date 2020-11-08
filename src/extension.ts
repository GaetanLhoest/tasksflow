// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { issue, issueCommand } from "./commands/issue";
import { configure } from "./commands/configure";
import { issues } from "./commands/issues";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tasksflow" is now active!');

  let disposable1 = vscode.commands.registerCommand("tasksflow.issue", () => {
    issueCommand();
  });

  let disposable2 = vscode.commands.registerCommand("tasksflow.issues", () => {
    issues();
  });

  let disposable3 = vscode.commands.registerCommand(
    "tasksflow.configure",
    () => {
      configure();
    }
  );

  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() { }
