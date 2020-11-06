
abstract class GitProvider {

    abstract getIssue(id: string): Issue;
    abstract getIssueList(): Array<Issue>;



}