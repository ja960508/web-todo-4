import express from 'express';
import cors from 'cors';
import config from '../mysql.config.js';

const app = express();
const port = 8080;

app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));
app.use(express.json());

app.listen(port, () => {
  console.log('app is listening on port ' + port);
});

config.connect();

// simple query
config.query('SELECT * FROM TEST', function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  // console.log(fields); // fields contains extra meta data about results, if available
});

config.end();
