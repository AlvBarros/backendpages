import dbcreds from "../config/cloudant/dbcreds.json";

import Cloudant from "../templates/cloudant/Cloudant";
import DTO from "../templates/DTO";

export class CloudantFactory {
    public createConnection(db: string): Cloudant {
        return new Cloudant(dbcreds, db);
    }
}

export default CloudantFactory;
