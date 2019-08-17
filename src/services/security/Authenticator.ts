import jwt = require("jsonwebtoken-promisified");
import jwtCreds from "../../config/jwt.json";
import User from "../../entities/account/User";

export class Authenticator {
    /*
    jwt.sign({
    data: 'foobar'
    }, 'secret', { expiresIn: 60 * 60 });
    */
    public async generateToken(usr: User): Promise<string> {
        return jwt.signAsync(usr, jwtCreds.secret);
    }

    public async verify(token): Promise<any> {
        return jwt.verify(token, jwtCreds.secret);
    }
}

export default Authenticator;
