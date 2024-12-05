import AppDB from "../config/appdb";
import { UserDetail } from "../interfaces/user-interfaces";

const UserModels = {
    async Login(username: string, password: string): Promise<boolean>{
        try {
            const requestLogin = await AppDB.user.findUnique({
                where: {
                    username: username,
                    password: password
                }
            });
            if(requestLogin){
                return true;
            }
            else{
                return false;
            }
        } catch (error) {
            throw new Error(`User Models Error: ${error}`);
        }
    },
    async Detail(username: string): Promise<UserDetail | null>{
        try {
            const userdetail = await AppDB.user.findFirst({
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true
                },
                where: {
                    username: username
                }
            });
            if(userdetail){
                return userdetail;
            }
            else{
                return null;
            }
        } catch (error) {
            throw new Error(`User Models Error: ${error}`);
        }
    }
};

export default UserModels;