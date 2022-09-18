"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArmeBdd = void 0;
const access_bdd_1 = require("./access-bdd");
class ArmeBdd {
    constructor() { }
    getAllArmes() {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("SELECT * FROM arme ", (error, respons) => {
                if (error) {
                    reject(error);
                }
                else {
                    result(respons);
                }
            });
        });
    }
    updateArme(arme) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("UPDATE arme SET robot_id=? WHERE id=?", [arme.robot_id, arme.id], (error, respons) => {
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
exports.ArmeBdd = ArmeBdd;
//# sourceMappingURL=arme-bdd.js.map