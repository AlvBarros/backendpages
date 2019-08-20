import User from "../entities/account/User";

import Profiles from "../entities/profiles/profiles.json";

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
}
export default UserFactory;
