import { Issue } from "../issue";
import { GitProvider } from "../git_providers";

export class Github implements GitProvider {
  async getIssue(id: string): Promise<Issue> {
    throw new Error("Method not implemented.");
  }

  async getIssueList(): Promise<Issue[]> {
    throw new Error("Method not implemented.");
  }
}
