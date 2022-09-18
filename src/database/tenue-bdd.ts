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

    updateTenue(tenue: Tenue) {
        return new Promise<Tenue[]>((result, reject) => {
            connection.query("UPDATE tenue SET robot_id=? WHERE id=?", 
            [tenue.robot_id, tenue.id], (error: Error, respons: any) => {
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