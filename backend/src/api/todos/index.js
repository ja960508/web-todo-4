import express from "express";
import {
  checkUsersColumn,
  checkUsersTodo,
  insertTodo,
  moveTodo,
  readTodo,
  removeTodo,
  updateTodo,
} from "./todos.ctrl.js";
import checkLoggedIn from "../../middleWare/checkLoggedIn.js";

const router = express.Router();

// 추가
router.post("/", checkLoggedIn, checkUsersColumn, insertTodo);

// 읽기
router.get("/", checkLoggedIn, readTodo);

// 변경
router.patch("/update", checkLoggedIn, checkUsersTodo, updateTodo);

// 제거
router.delete("/", checkLoggedIn, checkUsersTodo, removeTodo);

// 이동
router.patch(
  "/move",
  checkLoggedIn,
  checkUsersTodo,
  checkUsersColumn,
  moveTodo
);

export default router;
