import StringValidator from "../../services/utils/StringValidator";

export class User {
    public name: string;
    public email: string;
    public profile: string;
    public password: string;

    constructor(n: string, e: string, pr: string, pw: string) {
        this.name = n;
        this.email = e;
        this.profile = pr;
        this.password = pw;
    }

    public validForRegistration(): boolean {
        const stringValidator = new StringValidator();
        console.log(this.email, this.name, this.password);
        console.log(stringValidator.validateEmail(this.email),
        stringValidator.validateName(this.name),
        stringValidator.validatePassword(this.password));
        return stringValidator.validateEmail(this.email) &&
            stringValidator.validateName(this.name) &&
            stringValidator.validatePassword(this.password);
    }
}

export default User;
