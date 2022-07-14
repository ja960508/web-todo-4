import {
    insertTodoFromDB,
    isUsersTodo,
    moveTodoFromDB,
    readTodoFromDB,
    removeTodoFromDB,
    updateTodoFromDB,
} from "../../queries.js";
import {getUserId} from "../../utils/authUtils.js";

export function checkUsersTodo(req, res, next) {
    const userId = getUserId(req);

    const {todoId} = req.body;

    const callback = (result) => {
        if (result) {
            next();
        } else {
            res
                .status(400)
                .json({result: "failed", message: "해당 유저의 Todo가 아닙니다."});
        }
    }
    isUsersTodo({userId, todoId, callback});
}

export function checkUsersColumn(req, res, next) {
    const userId = getUserId(req);
    const {todoColumnId, nextTodoColumnId} = req.body;

    const callback = (result) => {
        if (result) {
            next();
        } else {
            res
                .status(400)
                .json({result: "failed", message: "해당 유저의 Column이 아닙니다."});
        }
    }
    isUsersTodo({userId, todoColumnId: todoColumnId ? todoColumnId : nextTodoColumnId, callback})
}

export function insertTodo(req, res) {
    const targetTodo = {
        title: req.body.title,
        content: req.body.content,
        todoColumnId,
    };

    const callback = (todoId) => {
        if (todoId) {
            res.json({todoId});
        } else {
            res.status(400)
                .json({result: 'failed'});
        }
    }
    insertTodoFromDB({
        todoColumnId,
        targetTodo,
        userId: getUserId(req),
        callback,
    });
}

export function removeTodo(req, res) {
    const todoId = req.body.todoId;
    const callback = (result) => {
        if (result) {
            res.json({result: 'success'});
        } else {
            res.status(400)
                .json({result: 'failed'});
        }
    }
    removeTodoFromDB({todoId, userId: getUserId(req), callback});
}

export function updateTodo(req, res) {
    const targetTodo = {
        title: req.body.title,
        content: req.body.content,
    };

    const callback = (result) => {
        if (result) {
            res.json({result: 'success'});
        } else {
            res.status(400)
                .json({result: 'failed'});
        }
    }

    updateTodoFromDB({
        todoId: req.body.todoId,
        targetTodo,
        userId: getUserId(req),
        callback
    });
}

export function readTodo(req, res) {
    const userId = getUserId(req);

    const callback = (todos) => {
        if (!todos) res.status(400).json({result: 'success'});
        const ret = {};
        todos.forEach((todo) => {
            if (!ret.hasOwnProperty(todo.todoColumnId)) ret[todo.todoColumnId] = [];
            ret[id].push(todo);
        });
        res.json(ret);
    }
    readTodoFromDB({userId, callback});
}

export function moveTodo(req, res) {
    const callback = (result) => {
        if (result) {
            res.json({result: 'success'});
        } else {
            res.status(400)
                .json({result: 'failed'});
        }
    }
    moveTodoFromDB({
        todoId: req.body.todoId,
        nextTodoColumnId: req.body.nextTodoColumnId,
        userId: getUserId(req),
        callback,
    });
}
