"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arme = void 0;
const arme_bdd_1 = require("../database/arme-bdd");
class Arme extends arme_bdd_1.ArmeBdd {
    constructor() {
        super();
        this.getArmes();
    }
    getArmes() {
        this.getAllArmes().then((data) => {
            this.armes = [...data];
        });
    }
}
exports.Arme = Arme;
//# sourceMappingURL=arme.js.map