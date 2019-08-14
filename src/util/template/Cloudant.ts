import cloudant = require("@cloudant/cloudant");

import { resolve } from "url";
import { Logger } from "../../services/logger/Logger";

export class Cloudant {
    // public prop: type;
    public connection: any;
    public database: string;
    public logger: Logger;

    constructor(config: object, db: string) {
        this.connection = cloudant(config);
        this.database = db;
        this.logger = new Logger();
        this.initializeDatabase();
    }

    public initializeDatabase(): void {
        try {
            this.connection.use(this.database);
        } catch {
            this.connection.db.create(this.database, (err) => {
                this.logger.Log({text: err, color: this.logger.Red });
            });
        }
    }

    public async insert(obj: any, id?: any): Promise<boolean> {
        return this.connection.use(this.database).insert(obj);
    }
}

export default Cloudant;
