import { Users } from "./models/user";
export class Login {
    public currentUser: Users;

    public loginNotExistError: boolean;
    public wrongLoginPassword: boolean;
    
    constructor(){}

    login(userData: Users, user: Users){
    
        const foundLogin = user.users.find(user => user.login === userData.login)
        this.currentUser = foundLogin;
          
        if (foundLogin) {
            this.loginNotExistError = false
    
            if (foundLogin.password === userData.password) {
                this.wrongLoginPassword = false
            }else{
                this.wrongLoginPassword = true
            }
        }else{
            this.loginNotExistError = true
        }
    }
}