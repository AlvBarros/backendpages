export class CloudantIndex {
    public name: string;
    public type: string;
    public fields: string[];

    constructor(n: string, t: string, f: string[]) {
        this.name = n;
        this.type = t;
        this.fields = f;
    }
}

export default CloudantIndex;
