import { Users } from "./models/user";
import { Request, Response } from "express";
import { Robots } from './models/robot';

export class Register {

    public loginAlreadyExist: boolean
    public passwordMatchError: boolean;

    constructor(){}

    register(formData: Request, response: Response, user: Users) {

        if (formData.body.password === formData.body.verifyPassword) {
            this.passwordMatchError = false;
        }else{
            this.passwordMatchError = true;
        }

        const foundLogin = user.users.find(user => user.login === formData.body.login)
    
        if (foundLogin) {
            this.loginAlreadyExist = true
        }else{
            this.loginAlreadyExist = false
        }

        if (user.users.length === 0) {
            formData.body.id = 0;
        }
        else {
            user.users.forEach((user) => {
                formData.body.id = user.id + 1;
            });
        }
        
        if(!this.loginAlreadyExist && !this.passwordMatchError){
            let userRobotPseudo = new Robots;
            userRobotPseudo.pseudo = formData.body.robotPseudo

            userRobotPseudo.addRobots(userRobotPseudo);
            user.addUsers(formData.body).then((data: Users[]) => { 
                response.redirect('/login')
            }).catch(err => {
                throw new Error(err.message)
            })
        }else{
            response.redirect('/register-user')
        }
    }
}