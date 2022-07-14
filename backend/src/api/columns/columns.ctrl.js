import { updateColumnFromDB } from "../../queries.js";

export function updateColumn(req, res) {
  const column = updateColumnFromDB({ ...req.body });
  res.json(column);
}
