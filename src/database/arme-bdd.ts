import { connection } from "./access-bdd";
import { Arme } from '../models/arme'

export class ArmeBdd {

    constructor(){}

    getAllArmes() {
        return new Promise<Arme[]>((result, reject) => {
            connection.query("SELECT * FROM arme ", (error: Error, respons: Arme[]) => {
                if (error){
                    reject(error)
                    console.log("arme error!!!!!!!!!!");
                } 
                else{
                    result(respons)
                    console.log("arme succes!!!!!!!!!!");
                } 
            })
        })
    }
}

