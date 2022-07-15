import { updateColumnFromDB } from "../../queries.js";

// todoColumnId, nextColumnTitle
export function updateColumn(req, res) {
  const callback = (result) => {
    if (result) res.json({result: 'success'});
    else res.json({result: 'failed'});
  }
  updateColumnFromDB({...req.body, callback})
}
