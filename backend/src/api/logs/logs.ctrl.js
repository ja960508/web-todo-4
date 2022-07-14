import { readLogFromDB } from "../../queries.js";

export function insertLog(req, res) {}

export function readLog(req, res) {
  const callback = (result) => {
    if (result) res.json(result);
    else res.status(400).json({result: 'failed'});
  }
 readLogFromDB({ userId, callback });
}
