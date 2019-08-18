interface IUserDoc extends IDoc {
    name: string;
    email: string;
    profile: string;
    password: string;
}

interface IUserQueryResult {
    docs: IUserDoc[];
}
