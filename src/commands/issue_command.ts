import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from "vscode";
import { GitRepository } from "../repositories/git_repository/git_repository";
import { GitProvider } from "../repositories/git_providers/git_provider";
const git: SimpleGit = simpleGit(vscode.workspace.rootPath);

export async function issueCommand() {
  vscode.window.showInformationMessage("Starting to work on a given issue!");
  let issueId;
  issueId = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: "E.g. 25",
    prompt: "Id of the issue",
  });

  let gitRepo = new GitRepository();
  await gitRepo.init();
  let gitRepoUrl = gitRepo.gitUrl;
  console.log(gitRepoUrl);
  let gitProvider = new GitProvider(gitRepo);
  let issue = await gitProvider.getIssue(issueId!);
  console.log(issue);
  //TODO work here
}
