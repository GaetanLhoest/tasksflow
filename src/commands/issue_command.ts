import { print } from "graphql";
import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from "vscode";
import { Gitlab } from "../repositories/git_providers/gp_gitlab";

const git: SimpleGit = simpleGit("/Users/gaetanlhoest/Dev/Projects/tasksflow");

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
  let listConfig = await git.checkout(["-b", issue.getBranchName()]);
  print("plop");
}
