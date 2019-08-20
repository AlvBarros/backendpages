import User from "../entities/account/User";
import UserDTO from "../entities/account/UserDTO";

import Profiles from "../entities/profiles/profiles.json";

import Authenticator from "../services/security/Authenticator";

export class UserFactory {
    public generateUserFromDoc(doc: IUserDoc): User {
        const user = new User();
        user.name = doc.name || "";
        user.email = doc.email || "";
        user.password = doc.password || "";
        user.profile = doc.profile || Profiles.default;
        user.messages = doc.messages || [];
        user.profilePicture = doc.profilePicture || "";
        return user;
    }
    public userRegistration(name: string, email: string, password: string, profile: string = Profiles.default): User {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        user.profile = profile;
        if (user.validForRegistration()) {
            return user;
        } else {
            throw new Error("Invalid input.");
        }
    }
    public async generateUserFromRequestHeader(headers: any): Promise<User> {
        if (!headers.authorization || headers.authorization.split("Bearer ").length !== 2) {
            throw new Error("Must be authenticated.");
        } else {
            const auth = new Authenticator();
            const token = headers.authorization.split("Bearer ")[1];
            return auth.verify(token).then((result) => {
                return new UserDTO().queryByEmail(result);
            });
        }
    }
    public generateUserFromRequestBody(body: any): User {
        if (!body.name || !body.email || !body.profile) {
            throw new Error("Invalid input.");
        } else {
            const user = new User();
            user.name = body.name || "";
            user.email = body.email || "";
            user.password = body.password || "";
            user.profile = body.profile || Profiles.default;
            user.messages = body.messages || [];
            user.profilePicture = body.profilePicture || "";
            return user;
        }
    }
}
export default UserFactory;
