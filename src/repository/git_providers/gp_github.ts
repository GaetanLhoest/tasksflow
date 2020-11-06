
class Github implements GitProvider {

    getIssue(): Issue {
        throw new Error("Method not implemented.");
    }

    getIssueList(): Array<Issue> {
        throw new Error("Method not implemented.");
    }

}