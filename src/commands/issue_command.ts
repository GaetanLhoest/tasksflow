import * as vscode from "vscode";
import { Gitlab } from "../repositories/git_providers/gp_gitlab";

export async function issueCommand() {
  vscode.window.showInformationMessage("Starting to work on a given issue!");
  let issueId;
  issueId = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: "E.g. 25",
    prompt: "Id of the issue",
  });
  let gitlab = new Gitlab('https://gitlab.com/');
  let issue = await gitlab.getIssue(issueId!);
  console.log(issue);
}
