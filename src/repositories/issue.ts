


export class Issue {

    _id: string;
    title?: string;
    body?: string;
    labels?: Array<string>;

    constructor(id: string,
        title?: string,
        body?: string,
        labels?: Array<string>) {
        this._id = id;
        this.title = title;
        this.body = body;
        this.labels = labels;
    }

    isBug(): boolean {
        return false;
    }

    isFeature(): boolean {
        return true;
    }

}