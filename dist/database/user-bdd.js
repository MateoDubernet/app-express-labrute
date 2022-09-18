"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBdd = void 0;
const access_bdd_1 = require("./access-bdd");
class UserBdd {
    constructor() { }
    getAllUsers() {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("SELECT * FROM user ", (error, respons) => {
                if (error) {
                    reject(error);
                }
                else {
                    result(respons);
                }
            });
        });
    }
    addUsers(user) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("INSERT INTO user (id, pseudo, login, password) VALUES (?, ?, ?, ?)", [user.id, user.pseudo, user.login, user.password], (error, respons) => {
                if (error) {
                    reject(error);
                }
                else {
                    result(respons);
                }
            });
        });
    }
}
exports.UserBdd = UserBdd;
//# sourceMappingURL=user-bdd.js.map