export class Issue {
  _id: string;
  number: string;
  title?: string;
  body?: string;
  bodyHTML?: string;
  labels?: Array<string>;

  constructor(
    id: string,
    number: string,
    title?: string,
    body?: string,
    bodyHTML?: string,
    labels?: Array<string>
  ) {
    this._id = id;
    this.number = number;
    this.title = title;
    this.body = body;
    this.bodyHTML = bodyHTML;
    this.labels = labels;
  }

  getBranchName() {
    let branchName = "";
    if (this.title === undefined) {
      branchName = "unknown";
    } else {
      branchName = this.title;
    }
    branchName = branchName.toLowerCase();
    branchName = branchName.replace(/\s/g, "_");
    branchName = branchName.replace("-", "_");
    branchName += "_#" + String(this.number);

    return branchName;
  }

  isBug(): boolean {
    return false;
  }

  isFeature(): boolean {
    return true;
  }
}
