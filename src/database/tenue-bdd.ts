import { connection } from "./access-bdd";
import { Tenue } from '../models/tenue'

export class TenueBdd {

    constructor(){}

    getAllTenues() {
        return new Promise<Tenue[]>((result, reject) => {
            connection.query("SELECT * FROM tenue ", (error: Error, respons: Tenue[]) => {
                if (error){
                    reject(error)
                    console.log("tenue error!!!!!!!!!!");
                } 
                else{
                    result(respons)
                    console.log("tenue succes!!!!!!!!!!");
                } 
            })
        })
    }
}