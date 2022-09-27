"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bouclier = void 0;
const bouclier_bdd_1 = require("../database/bouclier-bdd");
class Bouclier extends bouclier_bdd_1.BouclierBdd {
    constructor() {
        super();
        this.getBoucliers();
    }
    getBoucliers() {
        this.getAllBoucliers().then((data) => {
            this.boucliers = [...data];
        });
    }
    updateBouclierById(bouclier) {
        this.updateBouclier(bouclier);
    }
}
exports.Bouclier = Bouclier;
//# sourceMappingURL=bouclier.js.map