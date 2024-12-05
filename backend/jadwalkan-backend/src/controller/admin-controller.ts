import AdminModels from "../models/admin-models";
import { Decode } from "../utils/jwt";

const AdminController = {
    async Login(username: string, password: string): Promise<any>{
        try {
            if(username!=null || password!=null){
                const requestLogin = await AdminModels.Login(username, password);
                return requestLogin;
            }
            else{
                return false;
            }
        } catch (error) {
            throw new Error(`Admin Controller Error ${error}`);
        }
    },
    async Detail(token: string){
        try {
            const decodedToken: any = await Decode(token);
            const username: string = decodedToken.username;
            if(username){
                const userdetail = await AdminModels.Detail(username);
                if(userdetail){
                    return userdetail;
                }
                else{
                    return {};
                }
            }
            else{
                return {};
            }
        } catch (error: any) {
            if(error.message.includes("invalid JWT token")){
                return null;
            }
            else{
                throw new Error(`Admin Controller Error: ${error}`);
            }
        }
    }
};

export default AdminController;