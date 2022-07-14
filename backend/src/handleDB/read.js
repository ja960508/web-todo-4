import connection from "./config.js";

function handleDB({callback, query, queryData}) {
    if (queryData){
        connection.query(
            query,
            queryData,
            (err, results, fields) => {
                if (err) return callback(false);
                console.log('쿼리결과', results);
                callback(results);
            }
        )
    }
    else {
        connection.query(
            query,
            (err, results, fields) => {
                if (err) return callback(false);
                console.log('쿼리결과', results);
                callback(results);
            }
        )
    }
}


export  {handleDB};