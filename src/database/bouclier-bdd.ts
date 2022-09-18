import { connection } from "./access-bdd";
import { Bouclier } from '../models/bouclier'

export class BouclierBdd {

    constructor(){}

    getAllBoucliers() {
        return new Promise<Bouclier[]>((result, reject) => {
            connection.query("SELECT * FROM bouclier ", (error: Error, respons: Bouclier[]) => {
                if (error){
                    reject(error)
                    console.log("bouclier error!!!!!!!!!!");
                } 
                else{
                    result(respons)
                    console.log("bouclier succes!!!!!!!!!!");
                } 
            })
        })
    }
}