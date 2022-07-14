import express from "express";
import { updateColumn } from "./columns.ctrl.js";
import { checkUsersColumn } from "../todos/todos.ctrl.js";

const router = express.Router();

router.patch("/", checkUsersColumn, updateColumn);

export default router;
