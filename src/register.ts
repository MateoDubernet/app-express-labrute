// import { UserBdd } from "./database/user-bdd";
// import { Users } from "./models/user";

// export class Register {

//     public loginAlreadyExist: boolean
//     public passwordMatchError: boolean;
//     private user = new Users();
//     private userBdd = new UserBdd();

//     constructor(){}

//     register(userData: Users) {

//         if (userData.password === userData.verifyPassword) {
//             this.passwordMatchError = false;
//         }else{
//             this.passwordMatchError = true;
//         }

//         const foundLogin = this.user.users.find(user => user.login === userData.login)
    
//         if (foundLogin) {
//             this.loginAlreadyExist = true
//         }else{
//             this.loginAlreadyExist = false
//         }

//         if (this.user.users.length === 0) {
//             userData.id = 0;
//         }
//         else {
//             this.user.users.forEach((user) => {
//                 userData.id = user.id + 1;
//             });
//         }
        
//         if(!this.loginAlreadyExist && !this.passwordMatchError){
//             this.userBdd.addUsers(userData).then((data: Users[]) => { }).catch(err => {
//                 throw new Error(err.message)
//             })
//         }
//     }
// }