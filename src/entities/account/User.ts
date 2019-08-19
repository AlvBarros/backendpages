import StringValidator from "../../services/utils/StringValidator";

export class User {
    public name: string;
    public email: string;
    public password: string;
    public profile: string;

    public profilePicture: string;
    public messages: string[];

    constructor() {
        this.name = "";
        this.email = "";
        this.profile = "";
        this.password = "";
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
