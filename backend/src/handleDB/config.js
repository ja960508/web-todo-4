import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const {MYSQL_DB, MYSQL_PW,MYSQL_HOST, MYSQL_ID} = process.env;

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_ID,
    password: MYSQL_PW,
    database: MYSQL_DB,
    waitForConnections: true,
});

export default connection;
