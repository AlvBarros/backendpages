interface IUserDoc extends IDoc {
    name: string;
    email: string;
    profile: string;
    password: string;
    messages: string[];
    profilePicture: string;
}

interface IUserQueryResult {
    docs: IUserDoc[];
}
