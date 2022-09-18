import mysql from 'mysql2'

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "la_brute",
    port: 3306
})