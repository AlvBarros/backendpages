export class User {
    public email: string;
    public username: string;
    public profile: string;

    constructor(e: string, u: string, p: string) {
        this.email = e;
        this.username = u;
        this.profile = p;
    }
}

export default User;
