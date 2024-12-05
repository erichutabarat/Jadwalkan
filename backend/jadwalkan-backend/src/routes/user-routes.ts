import { Hono } from "hono";
import UserModels from "../models/user-models";
import UserController from "../controller/user-controller";
import { Sign } from "../utils/jwt";

const UserRoutes = new Hono();

UserRoutes.get('/', (c) => {
    return c.json({
        'message': 'Hello World'
    });
});

UserRoutes.post('/login', async (c) => {
    const data = await c.req.parseBody();
    const USER: string = (typeof data.username == "string") ? data.username : '';
    const PASS: string = (typeof data.password == "string") ? data.password : '';
    if(USER.length<0 || PASS.length<=1){
        c.status(400);
        return c.json({
            'message': 'Missing username or password'
        })
    }
    const login = await UserController.Login(USER, PASS);
    if(login){
        const role = 'user';
        const createToken = await Sign(USER, role);
        c.status(200);
        return c.json({
            'message': 'Login fuccessfully',
            'token': createToken
        });
    }
    else{
        c.status(401);
        return c.json({
            'message': 'Login failed'
        })
    }
})
export default UserRoutes;