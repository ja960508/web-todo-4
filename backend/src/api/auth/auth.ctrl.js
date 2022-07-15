import { getUserFromDB } from "../../queries.js";

export function login(req, res) {
  const { userId } = req.body;
  console.log('userId', userId);
  const callback = (user) => {
    if (user) {
      res.cookie("userId", userId);
      res.json({ result: "success" });
    } else {
      res.json({ result: "failed", message: "계정이 없습니다." });
    }
  }
  getUserFromDB({userId, callback});
}

export function logout(req, res) {
  res.clearCookie("userId").json({result: "success"});
}
