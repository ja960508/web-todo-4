import express from "express";
import { updateColumn } from "./columns.ctrl.js";
import { checkUsersColumn } from "../todos/todos.ctrl.js";
import checkLoggedIn from "../../middleWare/checkLoggedIn.js";

const router = express.Router();

// userId, todoColumnId, nextColumnTitle
router.patch("/", checkLoggedIn, checkUsersColumn, updateColumn);

export default router;
