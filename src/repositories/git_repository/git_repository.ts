import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from 'vscode';

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
    this.getProjectId();
    this.getGitProviderId();
  }

  getProjectId() {

    let _projectId = this.gitUrl!.match('(?<=:).*(?=\.git)');
    if (_projectId !== null) {
      this.projectId = _projectId[0];
    }
  }

  getGitProviderId() {
    if (this.gitUrl?.match('gitlab') !== null) {
      this.projectId = GitProvider.gitlab;
    } else if (this.gitUrl?.match('github') !== null) {
      this.projectId = GitProvider.github;
    } else if (this.gitUrl?.match('bitbucket') !== null) {
      this.projectId = GitProvider.bitbucket;
    } else {
      this.projectId = GitProvider.undefined;
    }
  }


}
