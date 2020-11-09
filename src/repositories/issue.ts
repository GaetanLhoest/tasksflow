export class Issue {
  _id: string;
  _iid: string;
  title?: string;
  body?: string;
  labels?: Array<string>;

  constructor(
    id: string,
    iid: string,
    title?: string,
    body?: string,
    labels?: Array<string>
  ) {
    this._id = id;
    this._iid = iid;
    this.title = title;
    this.body = body;
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
    branchName += "_#" + String(this._iid);

    return branchName;
  }

  isBug(): boolean {
    return false;
  }

  isFeature(): boolean {
    return true;
  }
}
