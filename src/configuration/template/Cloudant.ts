import cloudant = require("@cloudant/cloudant");

import { resolve } from "url";
import { Logger } from "../../services/logger/Logger";

export class Cloudant {
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
        try { this.connection.use(this.database); } catch {
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
/*

test.index(function(err, result) {
  if (err) {
    throw err;
  }

  console.log('The database has %d indexes', result.indexes.length);
  for (var i = 0; i < result.indexes.length; i++) {
    console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
  }
});

var queryById = { name:'queryById', type:'json', index:{fields:['id'] }}
test.index(queryById, function(err, response) {
  if (err) {
    throw err;
  }

  console.log('Index creation result: %s', response.result);
});

test.find({ selector: { id:1 } }, function(err, result) {
  if (err) {
    throw err;
  }

  console.log('Found %d documents with id 1', result.docs.length);
  for (var i = 0; i < result.docs.length; i++) {
    console.log('  Doc id: %s', result.docs[i]._id);
  }
});
*/
