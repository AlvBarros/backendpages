import dbcreds from "../config/dbcreds.json";

import DTO from "../../business/templates/DTO";
import Cloudant from "./Cloudant";

export class CloudantFactory {
    public createConnection(db: string): Cloudant {
        return new Cloudant(dbcreds, db);
    }
}

export default CloudantFactory;
