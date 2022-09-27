import { UserBdd } from "../database/user-bdd";

export class Users extends UserBdd{
    public id: number;
    public pseudo: string;
    public login: string;
    public password: string;

    public users: Users[];

    constructor(){
        super();
        this.getUsers();
    }

    getUsers(){
        this.getAllUsers().then((data: Users[]) => {
            this.users = [...data];
        }).catch(err => {
            throw new Error(err.message)
        })
    }
}