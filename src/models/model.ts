
export interface ModelInterface {
    load(o: object)
}

export interface Serializable {
    toJson(): string

    getJsonParameters(): {}
}

export class Model implements ModelInterface, Serializable {

    load(o: {}) {
        for (let i in o) {
            this[i] = o[i];
        }
    }

    constructor(o?: {}) {
        if (o !== undefined) {
            this.load(o);
        }
    }

    toJson(): string {
        return JSON.stringify(this.getJsonParameters());
    }

    getJsonParameters(): {} {
        return this;
    }
}
