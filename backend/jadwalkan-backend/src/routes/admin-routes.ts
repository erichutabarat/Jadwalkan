import { Hono } from "hono";
import AdminController from "../controller/admin-controller";
import { Decode, Sign } from "../utils/jwt";

const AdminRoutes = new Hono();

AdminRoutes.get('/', (c) => {
    return c.json({
        'msg': 'Hello World'
    });
});

AdminRoutes.post('/login', async (c) => {
    const data = await c.req.parseBody();
    const USER: string = (typeof data.username == "string") ? data.username : '';
    const PASS: string = (typeof data.password == "string") ? data.password : '';
    if(USER.length<0 || PASS.length<=1){
        c.status(400);
        return c.json({
            'message': 'Missing username or password'
        })
    }
    const login = await AdminController.Login(USER, PASS);
    if(login){
        const role = 'admin';
        const createToken = await Sign(USER, role);
        c.status(200);
        return c.json({
            'message': 'Login Success',
            'token':  createToken
        });
    }
    else{
        c.status(401);
        return c.json({
            'message': 'Login Failed'
        });
    }
});

AdminRoutes.post('/detail', async (c) => {
    const data = await c.req.parseBody();
    const TOKEN: string = (typeof data.token == "string") ? data.token : '';
    const checkRole = await Decode(TOKEN);
    if(checkRole.role!=='admin'){
        c.status(401);
        return c.json({
            'message': "You're not allowed here"
        })
    }
    const userdetail =  await AdminController.Detail(TOKEN);
    if(userdetail){
        c.status(200);
        return c.json({
            'message': 'Get data successfully',
            'data': userdetail
        });
    }
    else{
        c.status(401);
        return c.json({
            'message': 'Failed to get data',
        });
    }
});

export default AdminRoutes;