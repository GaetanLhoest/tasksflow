import { Issue } from "./issue";

export abstract class GitProvider {
  abstract async getIssue(id: string): Promise<Issue>;
  abstract async getIssueList(): Promise<Issue[]>;
}
