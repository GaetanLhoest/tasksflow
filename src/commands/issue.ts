import * as vscode from "vscode";

export async function issue() {
  vscode.window.showInformationMessage("Starting to work on a given issue!");
  let issueId;
  issueId = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: "E.g. 25",
    prompt: "Id of the issue",
  });
}
