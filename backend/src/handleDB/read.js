import mysql from 'mysql2';
import {MYSQL_DB, MYSQL_HOST, MYSQL_ID, MYSQL_PW} from "./config.js";

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_ID,
    password: MYSQL_PW,
    database: MYSQL_DB
});

function readTodos() {
     connection.query(
         'SELECT * FROM USER_TB WHERE TRUE',
         (err, results, fields) => {
             console.log(results);
             console.log(fields);
         }
     )
}
