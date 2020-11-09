// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { issueCommand } from "./commands/issue_command";
import { configureCommand } from "./commands/configure_command";
import { issuesCommand } from "./commands/issues_command";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tasksflow" is now active!');

  let disposable1 = vscode.commands.registerCommand("tasksflow.issue", () => {
    issueCommand();
  });

  let disposable2 = vscode.commands.registerCommand("tasksflow.issues", () => {
    issuesCommand();
  });

  let disposable3 = vscode.commands.registerCommand(
    "tasksflow.configure",
    () => {
      configureCommand();
    }
  );

  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {}
