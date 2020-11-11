import { print } from "graphql";
import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from "vscode";
import { Gitlab } from "../repositories/git_providers/gp_gitlab";

const git: SimpleGit = simpleGit(vscode.workspace.rootPath);

export async function issueCommand() {
  vscode.window.showInformationMessage("Starting to work on a given issue!");
  let issueId;
  issueId = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: "E.g. 25",
    prompt: "Id of the issue",
  });
  let gitlab = new Gitlab(
    "https://gitlab.com/",
    "gitlab-org/gitlab-vscode-extension"
  );
  let issue = await gitlab.getIssue(issueId!);
  var listConfig = await git.getRemotes(true);
  //TODO work here
}
