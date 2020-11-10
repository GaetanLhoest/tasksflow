import simpleGit, { SimpleGit } from "simple-git";

class GitRepository {
  gitUrl: string;
  git: SimpleGit;

  constructor() {
    this.git = simpleGit("/Users/gaetanlhoest/Dev/Projects/tasksflow");
    this.gitUrl = "";
  }
}
