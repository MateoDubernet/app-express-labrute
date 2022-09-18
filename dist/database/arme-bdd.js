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
                    console.log("arme error!!!!!!!!!!");
                }
                else {
                    result(respons);
                    console.log("arme succes!!!!!!!!!!");
                }
            });
        });
    }
}
exports.ArmeBdd = ArmeBdd;
//# sourceMappingURL=arme-bdd.js.map