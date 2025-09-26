import { connection } from "./access-bdd";
import { Robots } from '../models/robot'

export class RobotBdd {

    constructor(){}

    getAllRobots() {
        return new Promise<Robots[]>((result, reject) => {
            connection.query("SELECT * FROM robot ", (error: Error, respons: Robots[]) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                } 
            })
        })
    }
    
    updateArmeRobots(robots: Robots) {
        return new Promise<Robots[]>((result, reject) => {
            connection.query("UPDATE robot SET arme_id=?, puissance=?, esquive=? WHERE id=?", 
            [robots.arme_id, robots.puissance, robots.esquive, robots.id], (error: Error, respons: any) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                }
            })
        })
    }
    
    updateBouclierRobots(robots: Robots) {
        return new Promise<Robots[]>((result, reject) => {
            connection.query("UPDATE robot SET bouclier_id=?, defense=?, esquive=? WHERE id=?", 
            [robots.bouclier_id, robots.defense, robots.esquive, robots.id], (error: Error, respons: any) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                }
            })
        })
    }
    
    updateTenueRobots(robots: Robots) {
        return new Promise<Robots[]>((result, reject) => {
            connection.query("UPDATE robot SET tenue_id=?, pv=?, puissance=?, defense=? WHERE id=?", 
            [robots.tenue_id, robots.pv, robots.puissance, robots.defense, robots.id], (error: Error, respons: any) => {
                if (error){
                    reject(error)
                } 
                else{
                    result(respons)
                }
            })
        })
    }

    addRobots(robot: Robots) {
        return new Promise<Robots[]>((result, reject) => {
            connection.query("INSERT INTO robot (pseudo, user_id) VALUES (?, ?)", [robot.pseudo, robot.user_id], (error: Error, respons: any) => {
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

