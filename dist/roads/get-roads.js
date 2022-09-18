// import express, { Request, Response } from "express";
// import { Users } from '../class/user'
// import { Robots } from '../class/robot'
// import { Arme } from '../class/arme';
// import { Bouclier } from "../class/bouclier";
// import { Tenue } from "../class/tenue";
// const app = express();
// let users: Users[] = [];
// let robots: Robots[] = [];
// let armes: Arme[] = [];
// let boucliers: Bouclier[] = [];
// let tenues: Tenue[] = [];
// let connectedUser: Users;
// let connectedUserRobot: Robots
// let loginAlreadyExist: boolean
// let passwordMatchError: boolean;
// let loginExistError: boolean
// let wrongLoginPassword: boolean;
// export function getLogin(){
//     app.get('/login', (request: Request, response: Response) =>{
//         getUsers()
//         loginAlreadyExist = false
//         passwordMatchError = false
//         response.render('connection', { account: true, loginExistError, wrongPassword: wrongLoginPassword})
//     })
// }
// app.get('/register', (request: Request, response: Response) =>{
//     getUsers()
//     response.render('connection', { account: false, loginAlreadyExist, passwordMatchError})
// })
// app.get('/home', (request: Request, response: Response) =>{
//     loginExistError = false
//     wrongLoginPassword = false
//     response.render('home', {
//         connectedUser: connectedUser, 
//         connectedUserRobot: connectedUserRobot,
//         armes: armes,
//         boucliers: boucliers,
//         tenues: tenues
//     })
// })
// app.get('/robot-list', (request: Request, response: Response) =>{
//     getRobots()
//     loginExistError = false
//     wrongLoginPassword = false
//     response.render('robot-list', {connectedUser: connectedUser, robots: robots, users: users})
// })
//# sourceMappingURL=get-roads.js.map