// import { RobotBdd } from "../database/robot-bdd"
// import { Users } from './user';
// import { Login } from '../login';

export class Robots{

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

    // public robots: Robots[];
    // public connectedUserRobot: Robots
    
    constructor() {}

    // getRobots(){
    //     this.robotBdd.getAllRobots().then((data: Robots[]) => {
    //         this.robots = [...data]

    //         // for (let i = 0; i < this.robots.length; i++) {
    //         //     if (this.robots[i].user_id === this.user.connectedUser.id) {
    //         //         this.connectedUserRobot = this.robots[i]
    //         //     }
    
    //         //     this.user.users.forEach((user) => {
    //         //         if (user.id === this.robots[i].user_id) {
    //         //             this.robots[i].user_name = user.pseudo
    //         //         }
    //         //     });
    //         // }

    //     }).catch(err => {
    //         throw new Error(err.message)
    //     })
    // }
}