import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from 'vscode';

class GitRepository {
  gitUrl: string;
  git: SimpleGit;

  constructor() {
    this.git = simpleGit(vscode.workspace.rootPath);
    this.gitUrl = "";
  }
}
