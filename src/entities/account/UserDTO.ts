import UserConfig from "../../config/databases/user.json";
import UserFactory from "../../factories/UserFactory";
import CloudantIndex from "../../templates/cloudant/CloudantIndex";
import { DTO } from "../../templates/DTO";
import User from "./User";
import Hotel from "../hotel/Hotel";

export class UserDTO extends DTO {
    public indexes: CloudantIndex[];
    public userFactory = new UserFactory();

    constructor() {
        super("user");
    }
    public register(user: User): Promise<boolean> {
        return super.insert(user);
    }
    public async queryByEmail(email: string): Promise<User> {
        return this.query("email", email).then((result) => {
            if (result.docs.length !== 1) {
                return this.userFactory.generateUserFromDoc(result.docs[0]);
            } else {
                throw new Error("Multiple users with the same e-mail.");
            }
        }).catch((err) => { throw err; });
    }
    public async queryByName(name: string): Promise<User[]> {
        return this.query("name", name).then((result) => {
            if (result.docs.length > 0) {
                return result.docs.map((doc) => {
                    return this.userFactory.generateUserFromDoc(doc);
                });
            } else {
                return new Array<User>();
            }
        }).catch((err) => { throw err; });
    }
    public query(field: string, value: string): Promise<IUserQueryResult> {
        return this.cloudant.query(field, value);
    }
    public async registerHotel(user: { email: string }, hotel: Hotel): Promise<boolean> {
        
    }
}
export default UserDTO;