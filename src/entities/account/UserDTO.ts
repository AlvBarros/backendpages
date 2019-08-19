import UserConfig from "../../config/databases/user.json";
import CloudantIndex from "../../templates/cloudant/CloudantIndex";
import { DTO } from "../../templates/DTO";
import User from "./User";

export class UserDTO extends DTO {
    public indexes: CloudantIndex[];

    constructor() {
        super("user");
    }
    public register(user: User): Promise<boolean> {
        if (user.validForRegistration()) {
            if (!user.profile) {
                user.profile = "DEFAULT";
            }
            return super.insert(user);
        } else {
            throw new Error("Invalid input.");
        }
    }
    public async queryByEmail(email: string): Promise<User[]> {
        return super.query("email", email).then((result) => {
            if (result.docs.length > 0) {
                return result.docs.map((doc) => {
                    return this.generateUserFromDoc(doc);
                });
            } else {
                return new Array<User>();
            }
        }).catch((err) => { throw err; });
    }
    public generateUserFromDoc(doc: IUserDoc): User {
        return new User(doc.name, doc.email, doc.profile, doc.password);
    }
}
