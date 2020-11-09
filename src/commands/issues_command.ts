import * as vscode from "vscode";

export function issuesCommand() {
  vscode.window.showInformationMessage(
    "List issues to start working on one of them!"
  );
}
