import {
  getUsersColumnFromDB,
  insertTodoFromDB,
  isUsersColumn,
  isUsersTodo,
  moveTodoFromDB,
  readTodoFromDB,
  removeTodoFromDB,
  updateTodoFromDB,
} from "../../queries.js";
import { getUserId } from "../../utils/authUtils.js";

export function checkUsersTodo(req, res, next) {
  const userId = getUserId(req);

  const { todoId } = req.body;

  if (!isUsersTodo({ userId, todoId })) {
    res
      .status(400)
      .json({ result: "failed", message: "해당 유저의 Todo가 아닙니다." });
  } else {
    next();
  }
}

export function checkUsersColumn(req, res, next) {
  const userId = getUserId(req);

  const { todoColumnId, nextTodoColumnId } = req.body;

  if (
    !isUsersColumn({ userId, todoColumnId: todoColumnId ?? nextTodoColumnId })
  ) {
    res
      .status(400)
      .json({ result: "failed", message: "해당 유저의 컬럼이 아닙니다." });
  } else {
    next();
  }
}

export function insertTodo(req, res) {
  const targetTodo = {
    title: req.body.title,
    content: req.body.content,
    todoColumnId,
  };

  const todoId = insertTodoFromDB({
    todoColumnId,
    targetTodo,
    userId: getUserId(req),
  });
  res.json({ todoId });
}

export function removeTodo(req, res) {
  const todoId = req.body.todoId;
  const removedTodo = removeTodoFromDB({ todoId, userId: getUserId(req) });
  res.json(removedTodo);
}

export function updateTodo(req, res) {
  const targetTodo = {
    title: req.body.title,
    content: req.body.content,
  };

  const target = updateTodoFromDB({
    todoId: req.body.todoId,
    targetTodo,
    userId: getUserId(req),
  });
  res.json(target);
}

export function readTodo(req, res) {
  const userId = getUserId(req);
  const columns = getUsersColumnFromDB({ userId });
  const ret = {};
  columns.forEach(({ id }) => (ret[id] = []));
  const todos = readTodoFromDB({ userId });
  todos.forEach((todo) => ret[todo.todoColumnId].push(todo));
  Object.keys(ret).forEach((key) => ret[key].sort((a, b) => a.index - b.index));
  res.json(ret);
}

export function moveTodo(req, res) {
  const target = moveTodoFromDB({
    todoId: req.body.todoId,
    nextTodoColumnId: req.body.nextTodoColumnId,
    userId: getUserId(req),
  });
  res.json(target);
}
