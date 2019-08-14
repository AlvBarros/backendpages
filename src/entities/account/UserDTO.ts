import { DTO } from "../../util/template/DTO";
import User from "./User";

export class UserDTO extends DTO<User> {
    constructor() {
        super("user");
    }
    public register(u: User): Promise<boolean> {
        return super.insert(u);
    }
    // public login(e: string, p: string): Promise<User> {
    // }
}
