import * as vscode from "vscode";

export function issues() {
  vscode.window.showInformationMessage(
    "List issues to start working on one of them!"
  );
}
