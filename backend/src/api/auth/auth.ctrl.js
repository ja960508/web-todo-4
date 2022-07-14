import { getUserFromDB } from "../../queries.js";

export function login(req, res) {
  const { userId } = req.body;
  const user = getUserFromDB({ userId });
  if (user) {
    res.cookie("userId", userId);
    res.json({ result: "success" });
  } else {
    res.json({ result: "failed", message: "계정이 없습니다." });
  }
}

export function logout(req, res) {
  res.clearCookie("userId");
  res.json({ result: "success" });
}
