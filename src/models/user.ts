// import { UserBdd } from "../database/user-bdd";

export class Users {
    public id: number;
    public pseudo: string;
    public login: string;
    public password: string;
    public verifyPassword: string;

    // public users: Users[];
    // public connectedUser: Users;
    // private userBdd = new UserBdd();

    constructor(){}

    // getUsers(){
    //     this.userBdd.getAllUsers().then((data: Users[]) => {
    //         this.users = [...data]
            
    //     }).catch(err => {
    //         throw new Error(err.message)
    //     })
    // }
}