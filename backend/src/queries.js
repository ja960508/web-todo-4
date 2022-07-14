import {
  columnData,
  logData,
  removeDataAtDB,
  todoData,
  userData,
} from "../mock/mock.js";

function getUserFromDB({ userId }) {
  return userData[userId];
}

function readLogFromDB({ userId }) {
  return logData.filter((log) => log.userId === userId);
}

function insertLogFromDB({
  userId,
  type,
  todoTitle,
  todoColumnId,
  textTodoColumnId,
}) {
  logData.push({
    id: logData.length + 1,
    userId,
    type,
    todoTitle,
    todoColumnId,
    textTodoColumnId,
    date: new Date(),
  });
}

// targetTodo: { title, content }
function insertTodoFromDB({ todoColumnId, targetTodo, userId }) {
  // 먼저 있던 todo 들의 index를 하나씩 늘려준다
  todoData
    .filter((todo) => todo.todoColumnId === todoColumnId)
    .forEach((todo) => todo.index++);
  const todoId = todoData.length;
  targetTodo = { ...targetTodo, id: todoId, index: 0, todoColumnId };
  todoData.push(targetTodo);

  /********** 로그 기록 **********/
  insertLogFromDB({
    userId,
    type: "add",
    todoTitle: targetTodo.title,
    todoColumnId,
    nextTodoColumnId: null,
  });
  console.log(logData.at(-1));
  /***************************/

  // 프론트에서 쓸 수 있는 key 값을 return 해준다.
  return todoId;
}

function removeTodoFromDB({ todoId, userId }) {
  const removedTodo = todoData.find((todo) => todo.id === todoId);
  removeDataAtDB(todoId);

  /********** 로그 기록 **********/
  insertLogFromDB({
    userId,
    type: "remove",
    todoTitle: removedTodo.title,
    todoColumnId: removedTodo.todoColumnId,
    nextTodoColumnId: null,
  });
  console.log(logData.at(-1));
  /***************************/

  return removedTodo;
}

function moveTodoFromDB({ todoId, nextTodoColumnId, userId }) {
  const target = todoData.find((todo) => todo.id === todoId);
  const originTodoColumnId = target.todoColumnId;
  target.todoColumnId = nextTodoColumnId;

  /********** 로그 기록 **********/
  insertLogFromDB({
    userId,
    type: "move",
    todoTitle: target.title,
    todoColumnId: originTodoColumnId,
    nextTodoColumnId: nextTodoColumnId,
  });
  console.log(logData.at(-1));
  /***************************/

  return target;
}

function updateTodoFromDB({ todoId, targetTodo, userId }) {
  const curTodo = todoData.find((todo) => todo.id === todoId);
  const originTitle = curTodo.title;
  Object.keys(targetTodo).forEach((key) => (curTodo[key] = targetTodo[key]));

  /********** 로그 기록 **********/
  insertLogFromDB({
    userId,
    type: "update",
    todoTitle: originTitle,
    todoColumnId: curTodo.todoColumnId,
    nextTodoColumnId: null,
  });
  console.log(logData.at(-1));
  /***************************/

  return curTodo;
}

function readTodoFromDB({ userId }) {
  const columnIds = getUsersColumnFromDB({ userId }).map(({ id }) => id);
  return todoData.filter((todo) => columnIds.includes(todo.todoColumnId));
}

function insertColumnFromDB() {}

function updateColumnFromDB({ todoColumnId, nextColumnTitle }) {
  const targetColumn = columnData.find((column) => column.id === todoColumnId);
  targetColumn.title = nextColumnTitle;
  return targetColumn;
}

function deleteColumnFromDB() {}

function readColumnFromDB({ todoColumnId }) {
  return columnData.find((column) => column.id === todoColumnId);
}

function isUsersColumn({ todoColumnId, userId }) {
  return (
    columnData.find((column) => column.id === todoColumnId)?.userId === userId
  );
}

function isUsersTodo({ todoId, userId }) {
  const targetTodo = todoData.find((todo) => todo.id === todoId);
  const usersColumn = columnData.filter((column) => column.userId === userId);
  return targetTodo && targetTodo.todoColumnId in usersColumn;
}

function getUsersColumnFromDB({ userId }) {
  return columnData.filter((column) => column.userId === userId);
}

export {
  getUsersColumnFromDB,
  isUsersTodo,
  isUsersColumn,
  getUserFromDB,
  readLogFromDB,
  insertLogFromDB,
  moveTodoFromDB,
  removeTodoFromDB,
  updateTodoFromDB,
  insertTodoFromDB,
  readTodoFromDB,
  readColumnFromDB,
  updateColumnFromDB,
};
