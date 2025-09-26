import { connection } from "./access-bdd";
import { Bouclier } from '../models/bouclier'

export class BouclierBdd {

    constructor(){}

    getAllBoucliers() {
        return new Promise<Bouclier[]>((result, reject) => {
            connection.query("SELECT * FROM bouclier ", (error: Error, respons: Bouclier[]) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                } 
            })
        })
    }

    updateBouclier(bouclier: Bouclier) {
        return new Promise<Bouclier[]>((result, reject) => {
            connection.query("UPDATE bouclier SET robot_id=? WHERE id=?", 
            [bouclier.robot_id, bouclier.id], (error: Error, respons: any) => {
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