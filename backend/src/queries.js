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
    const callback = () => {};
    handleDB({callback, query, queryData});
}

// targetTodo: { title, content }
function insertTodoFromDB({todoColumnId, targetTodo, userId, callback: parentCallback}) {

    const insertQuery = 'INSERT INTO TODO_TB(title, content, todoColumnId, idx, userId) VALUES (?, ?, ?, ?, ?)';
    const queryData = [targetTodo.title, targetTodo.content, todoColumnId, 0, userId];

    const callbackAfterInsert = (result) => {
        const newTodoId = result.insertId;
        if (!newTodoId) parentCallback(false);

        const ascIdxQuery = `UPDATE SET idx = idx + 1 WHERE todoColumnId = ${todoColumnId} and idx >= ${0}`
        const callbackAfterAscIdx = (result) => {
            if (!result.affectedRows) return parentCallback(false);

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
        if (!targetTodo || !targetTodo.length) return parentCallback(false);
        targetTodo = targetTodo[0];
        const deleteQuery =  `DELETE FROM TODO_TB WHERE id=${todoId}`;
        const callbackAfterDelete = (result) => {
            if (!result.affectedRows) return parentCallback(false);
            const descIdxQuery = `UPDATE SET idx = idx - 1 WHERE todoColumnId = ${targetTodo.todoColumnId} and idx >= ${targetTodo.idx}`
            const callback = (result) => {
                if (!result.affectedRows) return parentCallback(false);
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

function moveTodoFromDB({ todoId, nextTodoColumnId, userId, nextIndex, callback: parentCallback}) {

    const findTodoQuery = `Select *
                   FROM TODO_TB
                   WHERE id = ${todoId}`;
    
    const callback = (todo) => {
        todo = todo[0];
        const moveQuery = `UPDATE SET todoColumn=${nextTodoColumnId}, idx=${nextIndex} WHERE id=${todoId}`
        
        const callbackAfterMove = (result) => {
            if (!result.affectedRows) return parentCallback(false);

            const tmpCallback = () => {};
            const descIdxQuery = `UPDATE TODO_TB SET idx = idx - 1 WHERE todoColumnId=${todo.todoColumnId} and id != ${todoId} and idx >= ${todo.idx}`
            const ascIdxQuery = `UPDATE TODO_TB SET idx = idx + 1 WHERE todoColumnId=${nextTodoColumnId} and id != ${todoId} and idx >= ${nextIndex}`

            const CallbackAfterModifyIdx = (result) => {
                if (!result.affectedRows) return parentCallback(false);
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
            handleDB({callback:tmpCallback, query: descIdxQuery});
            handleDB({callback:CallbackAfterModifyIdx, query: ascIdxQuery});


            parentCallback(true);
        }
        
        handleDB({callback: callbackAfterMove, query: moveQuery});

    }

    handleDB({callback, query: findTodoQuery});
}

function updateTodoFromDB({todoId, targetTodo, userId, callback: parentCallback}) {

    const findQuery = `Select *
                   FROM TODO_TB
                   WHERE id = ${todoId}`;

    const callbackAfterFindTodo = (todo) => {

        const updateQuery = `UPDATE TODO_TB
                   SET title=${targetTodo.title}, content=${targetTodo.content}
                   WHERE userId = ${userId}`;

        const callback = (result) => {
            if (!result.affectedRows) return parentCallback(false);

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

        handleDB({callback, query: updateQuery});

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

function insertColumnFromDB() {

}

function updateColumnFromDB({todoColumnId, nextColumnTitle, parentCallback}) {
    const query = `Update COLUMN_TB
                   SET title=?
                   WHERE id = ?`;
    const queryData = [nextColumnTitle, todoColumnId];
    const callback = (result) => {
        if (!result.affectedRows) return parentCallback(false);
        parentCallback(true);
    }
    handleDB({callback, query, queryData});
}

function isUsersColumn({todoColumnId, userId, callback: parentCallback}) {
    const query = `Select *
                   FROM COLUMN_TB
                   WHERE id = ${todoColumnId}`;
    const callback = (column) => {
        parentCallback(column[0].userId === userId);
    }
    handleDB({callback, query});
}

function isUsersTodo({todoId, userId, callback: parentCallback}) {
    const query = `Select *
                   FROM TODO_TB
                   WHERE id = ${todoId}`;
    const callback = (todo) => {
        parentCallback(todo[0].userId === userId);
    }
    handleDB({callback, query});
}

function getUsersColumnFromDB({userId, callback: parentCallback}) {
    const query = `Select *
                   FROM COLUMN_TB
                   WHERE id = ${userId}`;
    const callback = (results) => {
        parentCallback(results);
    }
    handleDB({callback, query});
}

function tmpFunc({userId = 1, callback: parentCallback}) {

    const query = `Select *
                   FROM USER_TB
                   WHERE id = ${userId}`;

    const callback = (results) => {
        console.log(results);
        parentCallback(results);
    }

    handleDB({callback, query});
}

export {
    tmpFunc,
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
    updateColumnFromDB,
};
