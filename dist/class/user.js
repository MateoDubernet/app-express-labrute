"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const user_bdd_1 = require("../database/user-bdd");
class Users {
    constructor() { }
    getUsers() {
        (0, user_bdd_1.getAllUsers)().then((data) => {
            this.users = [...data];
        }).catch(err => {
            throw new Error(err.message);
        });
    }
}
exports.Users = Users;
//# sourceMappingURL=user.js.map