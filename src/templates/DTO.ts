import User from "../entities/account/User";
import CloudantFactory from "../factories/CloudantFactory";
import Cloudant from "./cloudant/Cloudant";
import CloudantIndex from "./cloudant/CloudantIndex";

export class DTO<T> {
    public cloudant: Cloudant;

    constructor(db: string) {
        const factory = new CloudantFactory();
        this.cloudant = factory.createConnection(db);
    }

    public createIndexFromJson(obj: any): CloudantIndex {
        return new CloudantIndex(obj.name, obj.type, obj.index.fields);
    }

    public async query(field: string, value: string): Promise<any> {
        console.log("dto");
        return await this.cloudant.query(field, value);
    }

    public async insert(obj: T): Promise<boolean> {
        return await this.cloudant.insert(obj);
    }

    public async createIndexes(indexes: CloudantIndex[]): Promise<boolean[]> {
        return Promise.all(indexes.map((index) => {
            return this.cloudant.createIndex(index);
        }));
    }
}

export default DTO;
