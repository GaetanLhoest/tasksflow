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

  isBug(): boolean {
    return false;
  }

  isFeature(): boolean {
    return true;
  }
}
