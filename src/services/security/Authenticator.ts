import jwt = require("jsonwebtoken-promisified");
import User from "../../entities/user/User";

export class Authenticator {
    /*
    jwt.sign({
    data: 'foobar'
    }, 'secret', { expiresIn: 60 * 60 });
    */
    public async generateToken(usr: User): Promise<string> {
        return jwt.signAsync(usr, "secret");
    }

    public async verify(token): Promise<any> {
        return jwt.verify(token, "secret");
    }
}

export default Authenticator;
