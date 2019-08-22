import Cloudant from "../../database/cloudant/Cloudant";
import CloudantFactory from "../../database/cloudant/CloudantFactory";
import CloudantIndex from "../../database/cloudant/CloudantIndex";
import User from "../account/User";

export class DTO {
    public cloudant: Cloudant;

    constructor(db: string) {
        const factory = new CloudantFactory();
        this.cloudant = factory.createConnection(db);
    }

    public createIndexFromJson(obj: any): CloudantIndex {
        return new CloudantIndex(obj.name, obj.type, obj.index.fields);
    }

    public async insert(obj: any): Promise<boolean> {
        return await this.cloudant.insert(obj);
    }

    public async createIndexes(indexes: CloudantIndex[]): Promise<boolean[]> {
        return Promise.all(indexes.map((index) => {
            return this.cloudant.createIndex(index);
        }));
    }
}

export default DTO;
