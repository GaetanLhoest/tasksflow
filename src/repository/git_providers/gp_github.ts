
class Github implements GitProvider {

    getIssue(id: string): Issue {
        throw new Error("Method not implemented.");
    }

    getIssueList(): Array<Issue> {
        throw new Error("Method not implemented.");
    }

}