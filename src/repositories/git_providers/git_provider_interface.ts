import { Github } from "./gp_github";
import { Gitlab } from "./gp_gitlab";
import { GitRepository } from "../git_repository/git_repository";
import { Issue } from "../issue";

export abstract class GitProviderInterface {

  abstract async getIssue(id: string): Promise<Issue>;
  abstract async getIssueList(): Promise<Issue[]>;

}
