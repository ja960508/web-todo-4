import {handleDB} from "./handleDB/read.js";

function getUserFromDB({userId, callback: parentCallback}) {
    const query = `Select *
                   FROM USER_TB
                   WHERE id = ${userId}`;

    const callback = (results) => {
        parentCallback(results[0]);
    }
    handleDB({callback, query});
}

function readLogFromDB({userId, callback: parentCallback}) {
    const query = `Select *
                   FROM LOG_TB
                   WHERE userId = ${userId}`;

    const callback = (results) => {
        console.log('results', results);
        parentCallback(results);
    }
    handleDB({callback, query});
}

function insertLogFromDB(
    {
        userId,
        type,
        todoTitle,
        todoColumnId,
        nextTodoColumnId,
    }
) {

    const query = 'INSERT INTO LOG_TB(userId, type, todoTitle, todoColumnId, nextTodoColumnId) VALUES (?, ?, ?, ?, ?)';
    const queryData = [userId, type, todoTitle, todoColumnId, nextTodoColumnId];
    const callback = () => {
    };
    handleDB({callback, query, queryData});
}

// targetTodo: { title, content }
function insertTodoFromDB({todoColumnId, targetTodo, userId, callback: parentCallback}) {

    const insertQuery = 'INSERT INTO TODO_TB(title, content, todoColumnId, idx, userId) VALUES (?, ?, ?, ?, ?)';
    const queryData = [targetTodo.title, targetTodo.content, todoColumnId, 0, userId];

    const callbackAfterInsert = (result) => {
        const newTodoId = result.insertId;
        if (!newTodoId) {
            return parentCallback(false);
        }

        const ascIdxQuery = `UPDATE TODO_TB
                             SET idx = idx + 1
                             WHERE id != ${newTodoId}
                               and todoColumnId = ${todoColumnId}
                               and idx >= 0`
        const callbackAfterAscIdx = (result) => {
            if (!result.affectedRows) {
                return parentCallback(false);
            }

            /********** 로그 기록 **********/
            insertLogFromDB({
                userId,
                type: "add",
                todoTitle: targetTodo.title,
                todoColumnId,
                nextTodoColumnId: null,
            });
            /***************************/
            parentCallback(newTodoId);
        }
        handleDB({callback: callbackAfterAscIdx, query: ascIdxQuery});
    }
    handleDB({callback: callbackAfterInsert, query: insertQuery, queryData});

}

function removeTodoFromDB({todoId, userId, callback: parentCallback}) {

    const findTodoQuery = `Select *
                           FROM TODO_TB
                           WHERE id = ${todoId}`;

    const callbackAfterFindTodo = (targetTodo) => {
        if (!targetTodo || !targetTodo.length) {
            return parentCallback(false);
        }
        targetTodo = targetTodo[0];
        const deleteQuery = `DELETE
                             FROM TODO_TB
                             WHERE id = ${todoId}`;
        const callbackAfterDelete = (result) => {
            if (!result.affectedRows) {
                return parentCallback(false);
            }
            const descIdxQuery = `UPDATE TODO_TB
                                  SET idx = idx - 1
                                  WHERE todoColumnId = ${targetTodo.todoColumnId}
                                    and idx >= ${targetTodo.idx}`
            const callback = (result) => {
                if (!result.affectedRows) {
                    return parentCallback(false);
                }
                /********** 로그 기록 **********/
                insertLogFromDB({
                    userId,
                    type: "remove",
                    todoTitle: targetTodo.title,
                    todoColumnId: targetTodo.todoColumnId,
                    nextTodoColumnId: null,
                });
                /***************************/
                parentCallback(true);
            };
            handleDB({callback, query: descIdxQuery});
        }
        handleDB({callback: callbackAfterDelete, query: deleteQuery});
    }
    handleDB({callback: callbackAfterFindTodo, query: findTodoQuery});
}

function moveTodoFromDB({todoId, nextTodoColumnId, userId, nextIndex, callback: parentCallback}) {

    const findTodoQuery = `Select *
                           FROM TODO_TB
                           WHERE id = ${todoId}`;

    const callback = (todo) => {
        if (!todo || !todo.length) return parentCallback(false);
        todo = todo[0];
        const moveQuery = `UPDATE TODO_TB
                           SET todoColumnId=?,
                               idx=?
                           WHERE id = ?`

        const moveQueryData = [nextTodoColumnId, nextIndex, todoId];

        const callbackAfterMove = (result) => {
            if (!result.affectedRows) {
                return parentCallback(false);
            }

            const descIdxQuery = `UPDATE TODO_TB
                                  SET idx = idx - 1
                                  WHERE todoColumnId=?
                                    and id != ?
                                    and idx >= ?`
            const descIdxQueryData = [todo.todoColumnId, todoId, todo.idx];
            const ascIdxQuery = `UPDATE TODO_TB
                                 SET idx = idx + 1
                                 WHERE todoColumnId = ?
                                   and id != ?
                                   and idx >= ?`
            const ascIdxQueryData = [nextTodoColumnId, todoId, nextIndex];

            const callbackAfterDescIdx = (result) => {
                if (!result.affectedRows) {
                    return parentCallback(false);
                }
            };

            const callbackAfterAscIdx = (result) => {
                if (!result.affectedRows) {
                    return parentCallback(false);
                }
                /********** 로그 기록 **********/
                insertLogFromDB({
                    userId,
                    type: "move",
                    todoTitle: todo.title,
                    todoColumnId: todo.todoColumnId,
                    nextTodoColumnId: nextTodoColumnId,
                });
                /***************************/
                parentCallback(true);
            }

            handleDB({callback: callbackAfterDescIdx, query: descIdxQuery, queryData: descIdxQueryData});
            handleDB({callback: callbackAfterAscIdx, query: ascIdxQuery, queryData: ascIdxQueryData});
        }

        handleDB({callback: callbackAfterMove, query: moveQuery, queryData: moveQueryData});

    }

    handleDB({callback, query: findTodoQuery});
}

function updateTodoFromDB({todoId, targetTodo, userId, callback: parentCallback}) {

    const findQuery = `Select *
                       FROM TODO_TB
                       WHERE id = ${todoId}`;

    const callbackAfterFindTodo = (todo) => {
        if (!todo || !todo.length) {
            return parentCallback(false);
        }

        const updateQuery = `UPDATE TODO_TB
                             SET title=?,
                                 content=?
                             WHERE id = ?`;

        const updateQueryData = [targetTodo.title, targetTodo.content, todoId];

        const callback = (result) => {
            if (!result.affectedRows) {
                return parentCallback(false);
            }

            /********** 로그 기록 **********/
            insertLogFromDB({
                userId,
                type: "update",
                todoTitle: todo.title,
                todoColumnId: todo.todoColumnId,
                nextTodoColumnId: null,
            });
            /***************************/

            parentCallback(true);
        }

        handleDB({callback, query: updateQuery, queryData: updateQueryData});

    }

    handleDB({callback: callbackAfterFindTodo, query: findQuery});

}

function readTodoFromDB({userId, callback: parentCallback}) {
    const query = `Select *
                   FROM TODO_TB
                   WHERE userId = ${userId}`;
    const callback = (columns) => {
        parentCallback(columns);
    }
    handleDB({query, callback});
}

function updateColumnFromDB({todoColumnId, nextColumnTitle, callback: parentCallback}) {
    const query = `Update COLUMN_TB
                   SET title=?
                   WHERE id = ?`;
    const queryData = [nextColumnTitle, todoColumnId];
    const callback = (result) => {
        if (!result.affectedRows) {
            return parentCallback(false);
        }
        parentCallback(true);
    }
    handleDB({callback, query, queryData});
}

function isUsersColumn({todoColumnId, userId, callback: parentCallback}) {
    const query = `Select *
                   FROM COLUMN_TB
                   WHERE id = ${todoColumnId}`;
    const callback = (column) => {
        if (!column || !column.length) {
            parentCallback(false);
        }
        parentCallback(column[0].userId === userId);
    }
    handleDB({callback, query});
}

function isUsersTodo({todoId, userId, callback: parentCallback}) {
    const query = `Select *
                   FROM TODO_TB
                   WHERE id = ${todoId}`;
    const callback = (todo) => {
        if (!todo || !todo.length) {
            parentCallback(false);
        }
        parentCallback(true);
    }
    handleDB({callback, query});
}

export {
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
    updateColumnFromDB,
};
