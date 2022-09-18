"use strict";
const mysql = require('mysql2');
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "la_brute",
    port: 3306
});
function getAllUsers() {
    return new Promise((result, reject) => {
        connection.query("SELECT * FROM user ", (err, data) => {
            if (err) {
                reject(err);
                console.log("error!!!!!!!!!!");
            }
            else {
                result(data);
                console.log("succes!!!!!!!!!!");
            }
        });
    });
}
function getUsersById(id) {
    return new Promise((result, reject) => {
        connection.query("SELECT * FROM user WHERE id=?", [id], (err, data) => {
            if (err)
                reject(err);
            else
                result(data[0]);
        });
    });
}
function addUsers(user) {
    return new Promise((result, reject) => {
        connection.query("INSERT INTO user (id, pseudo, login, password) VALUES (?, ?, ?, ?)", [user.id, user.pseudo, user.login, user.password], (err, data) => {
            if (err) {
                reject(err);
                console.log("error!!!!!!!!!!");
            }
            else {
                result(data);
                console.log("succes!!!!!!!!!!");
                console.log(user);
            }
        });
    });
}
module.exports = {
    getAllUsers,
    addUsers,
    getUsersById
};
