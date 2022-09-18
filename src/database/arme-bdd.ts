import { connection } from "./access-bdd";
import { Arme } from '../models/arme'

export class ArmeBdd {

    constructor(){}

    getAllArmes() {
        return new Promise<Arme[]>((result, reject) => {
            connection.query("SELECT * FROM arme ", (error: Error, respons: Arme[]) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                } 
            })
        })
    }

    updateArme(arme: Arme) {
        return new Promise<Arme[]>((result, reject) => {
            connection.query("UPDATE arme SET robot_id=? WHERE id=?", 
            [arme.robot_id, arme.id], (error: Error, respons: any) => {
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

