"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const robot_1 = require("./models/robot");
class Register {
    constructor() { }
    register(formData, response, user) {
        if (formData.body.password === formData.body.verifyPassword) {
            this.passwordMatchError = false;
        }
        else {
            this.passwordMatchError = true;
        }
        const foundLogin = user.users.find(user => user.login === formData.body.login);
        if (foundLogin) {
            this.loginAlreadyExist = true;
        }
        else {
            this.loginAlreadyExist = false;
        }
        if (user.users.length === 0) {
            formData.body.id = 0;
        }
        else {
            user.users.forEach((user) => {
                formData.body.id = user.id + 1;
            });
        }
        if (!this.loginAlreadyExist && !this.passwordMatchError) {
            let userRobotPseudo = new robot_1.Robots;
            userRobotPseudo.pseudo = formData.body.robotPseudo;
            userRobotPseudo.addRobots(userRobotPseudo);
            user.addUsers(formData.body).then((data) => {
                response.redirect('/login');
            }).catch(err => {
                throw new Error(err.message);
            });
        }
        else {
            response.redirect('/register-user');
        }
    }
}
exports.Register = Register;
//# sourceMappingURL=register.js.map