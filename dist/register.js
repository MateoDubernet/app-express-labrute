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
            let newUserRobot = new robot_1.Robots;
            newUserRobot.pseudo = formData.body.robotPseudo;
            user.addUsers(formData.body).then((data) => {
                user.getAllUsers().then((data) => {
                    data.forEach((user) => {
                        if (user.login === formData.body.login) {
                            newUserRobot.user_id = user.id;
                            newUserRobot.addRobots(newUserRobot);
                        }
                    });
                });
                response.redirect('/login');
            }).catch(err => {
                throw new Error(err.message);
            });
        }
        else {
            response.redirect('/register');
        }
    }
}
exports.Register = Register;
//# sourceMappingURL=register.js.map