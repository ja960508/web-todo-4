import { readLogFromDB } from "../../queries.js";
import { getUserId } from "../../utils/authUtils.js";

export function insertLog(req, res) {}

export function readLog(req, res) {
  const userId = getUserId(req);
  const logs = readLogFromDB({ userId });
  res.json(logs);
}
