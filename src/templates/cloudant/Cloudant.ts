import cloudant = require("@cloudant/cloudant");

import { Logger } from "../../services/logger/Logger";
import CloudantIndex from "./CloudantIndex";

export class Cloudant {
    public connection: any;
    public database: string;
    public logger: Logger;
    // public indexes: CloudantIndex[];

    constructor(config: object, db: string) {// , indexes: CloudantIndex[]) {
        this.connection = cloudant(config);
        this.database = db;
        this.logger = new Logger();
        // this.indexes = indexes;
        this.initializeDatabase();
    }

    public initializeDatabase(): void {
        try { this.connection.use(this.database); } catch {
            this.connection.db.create(this.database, (err) => {
                this.logger.Log({text: err, color: this.logger.Red });
            });
        }
        // TODO: setup way to setup database
        // this.initializeIndexes();
    }

    // public initializeIndexes(): void {
    //   this.indexes.map((index) => {
    //     this.findIndex(index).then((found) => {
    //       if (!found) {
    //         return this.createIndex(index);
    //       }
    //     });
    //   });
    // }

    public async insert(obj: any, id?: any): Promise<boolean> {
        return this.connection.use(this.database).insert(obj);
    }

    public async createIndex(index: CloudantIndex): Promise<boolean> {
      return this.connection.index(index.name, index.type, { fields: index.fields })
      .then((err, result) => {
        if (err) {
          throw err;
        } else {
          return true;
        }
      });
    }

    public async findIndex(index: CloudantIndex) {
      return this.connection.index((err, result) => {
        if (err) {
          throw err;
        } else {
          return result.indexes.filter((i) => i.name === index.name).length > 0;
        }
      });
    }

    public async query(field: string, value: string): Promise<any> {
      const selector = {};
      selector[field] = value;
      return await this.connection.use(this.database).find({ selector }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("result!");
          console.log(result);
          return result;
        }
      });
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