"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotBdd = void 0;
const access_bdd_1 = require("./access-bdd");
class RobotBdd {
    constructor() { }
    getAllRobots() {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("SELECT * FROM robot ", (error, respons) => {
                if (error) {
                    reject(error);
                    console.log("robot error!!!!!!!!!!");
                }
                else {
                    result(respons);
                    console.log("robot succes!!!!!!!!!!");
                }
            });
        });
    }
    updateArmeRobots(robots) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("UPDATE robot SET arme_id=?, puissance=?, esquive=? WHERE id=?", [robots.arme_id, robots.puissance, robots.esquive, robots.id], (error, respons) => {
                if (error) {
                    reject(error);
                    console.log("robot arme error!!!!!!!!!!");
                }
                else {
                    result(respons);
                    console.log("robot arme succes!!!!!!!!!!");
                }
            });
        });
    }
    updateBouclierRobots(robots) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("UPDATE robot SET bouclier_id=?, defense=?, esquive=? WHERE id=?", [robots.bouclier_id, robots.defense, robots.esquive, robots.id], (error, respons) => {
                if (error) {
                    reject(error);
                    console.log("robot error!!!!!!!!!!");
                }
                else {
                    result(respons);
                    console.log("robot succes!!!!!!!!!!");
                }
            });
        });
    }
    updateTenueRobots(robots) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("UPDATE robot SET tenue_id=?, pv=?, puissance=?, defense=? WHERE id=?", [robots.tenue_id, robots.pv, robots.puissance, robots.defense, robots.id], (error, respons) => {
                if (error) {
                    reject(error);
                    console.log("robot error!!!!!!!!!!");
                }
                else {
                    result(respons);
                    console.log("robot succes!!!!!!!!!!");
                }
            });
        });
    }
    addRobots(robot) {
        return new Promise((result, reject) => {
            access_bdd_1.connection.query("INSERT INTO robot (pseudo) VALUES (?)", [robot.pseudo], (error, respons) => {
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
exports.RobotBdd = RobotBdd;
//# sourceMappingURL=robot-bdd.js.map