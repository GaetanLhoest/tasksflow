import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from 'vscode';
import { GitProvider } from "../git_providers/git_provider";

export class GitRepository {
  gitUrl?: string;
  projectId?: string;
  providerId?: string;
  git: SimpleGit;

  constructor() {
    this.git = simpleGit(vscode.workspace.rootPath);
  }

  async init() {
    var listRemotes = await this.git.getRemotes(true);
    this.gitUrl = listRemotes[0].refs.fetch;
    this.projectId = this.getProjectId();
    this.providerId = this.getGitProviderId();
  }

  getProjectId() {
    let _projectId = this.gitUrl!.match('(?<=git@.*:).*(?=\.git)');
    if (_projectId !== null) {
      return _projectId[0];
    }
    _projectId = this.gitUrl!.match('(?<=https://.*/).*(?=\.git)');
    if (_projectId !== null) {
      return _projectId[0];
    }
    return undefined;
  }

  getGitProviderId() {
    if (this.gitUrl?.match('gitlab') !== null) {
      return GitProvider.gitlab;
    } else if (this.gitUrl?.match('github') !== null) {
      return GitProvider.github;
    } else if (this.gitUrl?.match('bitbucket') !== null) {
      return GitProvider.bitbucket;
    } else {
      return GitProvider.undefined;
    }
    return undefined;
  }


}
