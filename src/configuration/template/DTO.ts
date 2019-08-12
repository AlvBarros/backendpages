import Cloudant from "./Cloudant";
import CloudantFactory from "./factories/CloudantFactory";

export class DTO<T> {
    public cloudant: Cloudant;

    constructor(db: string) {
        const factory = new CloudantFactory();
        this.cloudant = factory.createConnection(db);
    }

    public async insert(obj: T): Promise<boolean> {
        return await this.cloudant.insert(obj);
    }
}

export default DTO;
