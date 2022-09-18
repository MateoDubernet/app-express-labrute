import { connection } from "./access-bdd";
import { Users } from '../models/user'
export class UserBdd {

    constructor(){}

    getAllUsers() {
        return new Promise<Users[]>((result, reject) => {
            connection.query("SELECT * FROM user ", (error: Error, respons: Users[]) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                } 
            })
        })
    }
    
    addUsers(user: Users) {
        return new Promise<Users[]>((result, reject) => {
            connection.query("INSERT INTO user (id, pseudo, login, password) VALUES (?, ?, ?, ?)", [user.id, user.pseudo, user.login, user.password], (error: Error, respons: any) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                }
            })
        })
    }
}