import {decode, sign, verify} from 'hono/jwt';

const secret = 'WOPS';

const Sign = async (username: string, role: string): Promise<string> => {
    const payload = {
        username: username,
        role: role,
        exp: Math.floor(Date.now() / 1000 ) + 60 * 60
    };
    const token = await sign(payload, secret);
    return token;
};

const Verify = async (token: string): Promise<number | any> => {
    const username = await verify(token, secret);
    return username.exp;
};

const Decode = async (token: string): Promise<any> => {
    const {header, payload} = await decode(token);
    return payload;
}

export {Sign, Verify, Decode};