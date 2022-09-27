import { RobotBdd } from "../database/robot-bdd"
export class Robots extends RobotBdd {

    public id: number 
    public pseudo: string
    public puissance: number
    public esquive: number
    public defense: number
    public pv: number
    public niveau: number
    public experience: number
    public argent: number
    public tenue_id: number
    public bouclier_id: number
    public arme_id: number
    public email: string
    public user_id: number
    public user_name: string
    
    constructor() {
        super()
    }

}