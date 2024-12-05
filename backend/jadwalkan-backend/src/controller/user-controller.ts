import UserModels from "../models/user-models";
import { Decode } from "../utils/jwt";

const UserController = {
    async Login(username: string, password: string): Promise<any>{
        try {
            if(username!=null || password!=null){
                const requestLogin = await UserModels.Login(username, password);
                return requestLogin;
            }
            else{
                return false;
            }
        } catch (error) {
            throw new Error(`User Controller Error: ${error}`);
        }
    },
    async Detail(token: string){
        try {
            const decodedToken: any = await Decode(token);
            const username: string = decodedToken.username;
            if(username){
                const userdetail = await UserModels.Detail(username);
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

export default UserController;