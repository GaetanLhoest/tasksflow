// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { issueCommand } from "./commands/issue_command";
import { configureCommand } from "./commands/configure_command";
import { issuesCommand } from "./commands/issues_command";
import { Disposable } from "vscode";
import { AllTasksProvider } from "./panels/all_tasks_provider";
import { startTaskCommand } from "./commands/start_task_command";

export class Panels {
  public static startTaskPanel: vscode.WebviewPanel | undefined = undefined;
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tasksflow" is now active!');

  registerCommands(context);
  registerPanels(context);

}

function registerCommands(context: vscode.ExtensionContext) {

  let commands: Array<Disposable> = [
    vscode.commands.registerCommand("tasksflow.issue", () => {
      issueCommand();
    }),
    vscode.commands.registerCommand("tasksflow.startTask", (issue) => {
      startTaskCommand(issue);
    }),
    vscode.commands.registerCommand("tasksflow.issues", () => {
      issuesCommand();
    }),
    vscode.commands.registerCommand("tasksflow.configure", () => {
      configureCommand();
    }
    )
  ];
  commands.map((disposable) =>
    context.subscriptions.push(disposable)
  );
}

function registerPanels(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.window.registerTreeDataProvider('allOpened', new AllTasksProvider()));

  vscode.window.createTreeView('allOpened', {
    treeDataProvider: new AllTasksProvider()
  });

}

// this method is called when your extension is deactivated
export function deactivate() { }
