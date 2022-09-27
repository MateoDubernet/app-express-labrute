"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenue = void 0;
const tenue_bdd_1 = require("../database/tenue-bdd");
class Tenue extends tenue_bdd_1.TenueBdd {
    constructor() {
        super();
        this.getTenues();
    }
    getTenues() {
        this.getAllTenues().then((data) => {
            this.tenues = [...data];
        });
    }
    updateTenueById(tenue) {
        this.updateTenue(tenue);
    }
}
exports.Tenue = Tenue;
//# sourceMappingURL=tenue.js.map