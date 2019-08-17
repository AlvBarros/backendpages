export class CloudantQueryReturn {
    public docs: [];

    constructor(result: any) {
        this.docs = result.docs;
    }
}

export default CloudantQueryReturn;
