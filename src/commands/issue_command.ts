import { print } from "graphql";
import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from "vscode";
import { GitProvider, gitProviderUrl } from "../repositories/git_providers/git_provider";
import { Gitlab } from "../repositories/git_providers/gp_gitlab";
import { GitRepository } from "../repositories/git_repository/git_repository";

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
  let gitlab = new Gitlab(
    gitProviderUrl.get(gitRepo.providerId!)!,
    gitRepo.projectId!
  );
  let issue = await gitlab.getIssue(issueId!);
  console.log(issue);
  //TODO work here
}
