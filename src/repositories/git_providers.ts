
abstract class GitProvider {

    abstract async getIssue(id: string): Promise<Issue>;
    abstract async getIssueList(): Promise<Issue[]>;



}