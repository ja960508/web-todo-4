import { getUserId } from "../utils/authUtils.js";

function checkLoggedIn(req, res, next) {
  const userId = getUserId(req);
  if (userId) {
    next();
  } else {
    res
      .status(401)
      .json({ result: "failed", message: "로그인이 되어있지 않습니다." });
  }
}

export default checkLoggedIn;
