"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = void 0;
const access_bdd_1 = require("./access-bdd");
function getAllItems() {
    return new Promise((result, reject) => {
        access_bdd_1.connection.query("SELECT * FROM objet ", (error, respons) => {
            if (error) {
                reject(error);
                console.log("error!!!!!!!!!!");
            }
            else {
                result(respons);
                console.log("succes!!!!!!!!!!");
            }
        });
    });
}
exports.getAllItems = getAllItems;
function getItemById(id) {
    return new Promise((result, reject) => {
        access_bdd_1.connection.query("SELECT * FROM objet WHERE id=?", [id], (error, respons) => {
            if (error) {
                reject(error);
                console.log("error!!!!!!!!!!");
            }
            else {
                result(respons);
                console.log("succes!!!!!!!!!!");
            }
        });
    });
}
function addItem(item) {
    return new Promise((result, reject) => {
        access_bdd_1.connection.query("INSERT INTO objet (id, nom, categorie, quantite) VALUES (?, ?, ?, ?)", [item.id, item.nom], (error, respons) => {
            if (error) {
                reject(error);
                console.log("error!!!!!!!!!!");
            }
            else {
                result(respons);
                console.log("succes!!!!!!!!!!");
            }
        });
    });
}
//# sourceMappingURL=item-bdd.js.map