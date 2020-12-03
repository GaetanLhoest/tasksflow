import { GitWorkflow } from "../services/git_workflow/git_workflow";
import { Issue } from "./issue";

export class Task {

    issue: Issue;

    constructor(issue: Issue) {
        this.issue = issue;
    }

    getBranchName() {
        let branchName = "";
        if (this.issue.title === undefined) {
            branchName = "unknown";
        } else {
            branchName = this.issue.title;
        }
        branchName = branchName.toLowerCase();
        branchName = branchName.replace(/\s/g, "_");
        branchName = branchName.replace("-", "_");
        branchName += "_#" + String(this.issue.number);
        return branchName;
    }

    start() {
        let gitWorkflow = new GitWorkflow();
        gitWorkflow.startTask(this.getBranchName());
    }

}