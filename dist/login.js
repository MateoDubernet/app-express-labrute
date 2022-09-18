// import { Arme } from "./models/arme";
// import { Bouclier } from "./models/bouclier";
// import { Robots } from "./models/robot";
// import { Tenue } from "./models/tenue";
// import { Users } from "./models/user"
// export class Login {
//     public user = new Users();
//     private robot = new Robots();
//     private arme = new Arme();
//     private bouclier = new Bouclier();
//     private tenue = new Tenue();
//     public loginExistError: boolean;
//     public wrongLoginPassword: boolean;
//     constructor(){
//         this.user.getUsers()
//     }
//     login(userData: Users){
//         const foundLogin = this.user.users.find(user => user.login === userData.login)
//         this.wrongLoginPassword = false
//         this.user.connectedUser = foundLogin
//        this.robot.getRobots();
//        this.arme.getArmes();
//        this.bouclier.getBoucliers();
//        this.tenue.getTenues();
//         if (foundLogin) {
//             this.loginExistError = false
//             if (foundLogin.password === userData.password) {
//                 this.wrongLoginPassword = false
//             }else{
//                 this.wrongLoginPassword = true
//             }
//         }else{
//             this.loginExistError = true
//         }
//     }
// }
//# sourceMappingURL=login.js.map