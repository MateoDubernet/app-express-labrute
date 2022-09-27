"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
class Login {
    constructor() { }
    login(userData, user) {
        const foundLogin = user.users.find(user => user.login === userData.login);
        this.currentUser = foundLogin;
        if (foundLogin) {
            this.loginNotExistError = false;
            if (foundLogin.password === userData.password) {
                this.wrongLoginPassword = false;
            }
            else {
                this.wrongLoginPassword = true;
            }
        }
        else {
            this.loginNotExistError = true;
        }
    }
}
exports.Login = Login;
//# sourceMappingURL=login.js.map