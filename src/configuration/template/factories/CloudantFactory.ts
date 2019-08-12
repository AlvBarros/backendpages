import dbcreds from "./dbcreds.json";

import Cloudant from "../Cloudant";
import DTO from "../DTO";

export class CloudantFactory {
    public createConnection(db: string): Cloudant {
        return new Cloudant(dbcreds, db);
    }
}

export default CloudantFactory;
