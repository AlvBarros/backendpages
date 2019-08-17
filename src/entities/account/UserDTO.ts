import UserConfig from "../../config/databases/User.json";
import CloudantIndex from "../../templates/cloudant/CloudantIndex";
import { DTO } from "../../templates/DTO";
import User from "./User";

export class UserDTO extends DTO<User> {
    public indexes: CloudantIndex[];

    constructor() {
        super("user");
    }
    public register(u: User): Promise<boolean> {
        return super.insert(u);
    }
    public async queryByEmail(email: string): Promise<User> {
        return await super.query("email", email).then((result) => {
            console.log("userdto");
            console.log(result);
            return new User(result.docs[0].name, result.docs[0].email, result.docs[0].profile);
        });
    }
    // public login(e: string, p: string): Promise<User> {
    // }
}
