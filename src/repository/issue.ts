


class Issue {

    _id: string;
    title?: string;
    body?: string;
    tags?: Array<string>;

    constructor(id: string,
        title?: string,
        body?: string,
        tags?: Array<string>) {
        this._id = id;
        this.title = title;
        this.body = body;
        this.tags = tags;
    }

    isBug(): boolean {
        return false;
    }

    isFeature(): boolean {
        return true;
    }

}