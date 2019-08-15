import { DTO } from "../../templates/DTO";
import User from "./User";

export class UserDTO extends DTO<User> {
    constructor() {
        super("user");
    }
    public register(u: User): Promise<boolean> {
        return super.insert(u);
    }
    public find(email: string, password: string): User {
        return new User("Mock", "mock@gmail.com", "Admin");
    }
    // public login(e: string, p: string): Promise<User> {
    // }
}
