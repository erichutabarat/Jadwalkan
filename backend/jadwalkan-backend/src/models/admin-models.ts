import AppDB from "../config/appdb";

const AdminModels = {
    async Login(username: string, password: string): Promise<boolean>{
        try {
            const requestLogin = await AppDB.admin.findFirst({
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
            throw new Error(`Admin Models Error: ${error}`)
        }
    },
    async Detail(username: string): Promise<any>{
        try {
            const userdetail = await AppDB.admin.findFirst({
                select: {
                    id: true,
                    username: true,
                    email: true
                },
                where: {
                    username: username
                }
            });
            if(userdetail){
                return userdetail;
            }
            else{
                return {};
            }
        } catch (error) {
            throw new Error(`Admin Models Error: ${error}`);
        }
    }
};

export default AdminModels;