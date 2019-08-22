import jwt = require("jsonwebtoken-promisified");
import User from "../../../business/account/User";
import jwtCreds from "./jwt.json";

export class Authenticator {
    /*
    jwt.sign({
    data: 'foobar'
    }, 'secret', { expiresIn: 60 * 60 });
    */
    public async generateToken(usr: User): Promise<string> {
        console.log("generating token");
        console.log(usr);
        return jwt.signAsync(`${usr.email}`, jwtCreds.secret);
    }
    public async verify(token): Promise<string> {
        return jwt.verify(token, jwtCreds.secret);
    }
    public getTokenFromHeader(headers: any): string {
        if (!headers.authorization || headers.authorization.split("Bearer ").length !== 2) {
            throw new Error("Must be authenticated.");
        } else {
            return headers.authorization.split("Bearer ")[1];
        }
    }
}

export default Authenticator;
