"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenueBdd = void 0;
const access_bdd_1 = require("./access-bdd");
class TenueBdd {
    constructor() { }
    getAllTenues() {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("SELECT * FROM tenue ", (error, respons) => {
                if (error) {
                    reject(error);
                    console.log("tenue error!!!!!!!!!!");
                }
                else {
                    result(respons);
                    console.log("tenue succes!!!!!!!!!!");
                }
            });
        });
    }
    updateTenue(tenue) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("UPDATE tenue SET robot_id=? WHERE id=?", [tenue.robot_id, tenue.id], (error, respons) => {
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
exports.TenueBdd = TenueBdd;
//# sourceMappingURL=tenue-bdd.js.map