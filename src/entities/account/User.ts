export class User {
    public name: string;
    public email: string;
    public profile: string;

    constructor(n: string, e: string, pr: string) {
        this.name = n;
        this.email = e;
        this.profile = pr;
    }
}

export default User;