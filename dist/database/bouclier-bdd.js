"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BouclierBdd = void 0;
const access_bdd_1 = require("./access-bdd");
class BouclierBdd {
    constructor() { }
    getAllBoucliers() {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("SELECT * FROM bouclier ", (error, respons) => {
                if (error) {
                    reject(error);
                }
                else {
                    result(respons);
                }
            });
        });
    }
    updateBouclier(bouclier) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("UPDATE bouclier SET robot_id=? WHERE id=?", [bouclier.robot_id, bouclier.id], (error, respons) => {
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
exports.BouclierBdd = BouclierBdd;
//# sourceMappingURL=bouclier-bdd.js.map