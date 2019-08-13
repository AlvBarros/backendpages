import CloudantFactory from "../factories/CloudantFactory";
import Cloudant from "./Cloudant";

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
