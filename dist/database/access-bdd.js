"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
exports.connection = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "la_brute",
    port: 3306
});
//# sourceMappingURL=access-bdd.js.map