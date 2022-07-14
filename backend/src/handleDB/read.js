import mysql from 'mysql2';
import connection from "./config.js";

function readTodos() {
     connection.query(
         'SELECT * FROM USER_TB WHERE TRUE',
         (err, results, fields) => {
             console.log(results);
             console.log(fields);
         }
     )
}

export default readTodos;