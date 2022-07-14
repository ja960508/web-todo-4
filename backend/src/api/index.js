import express from "express";
import columnsRouter from "./columns/index.js";
import todosRouter from "./todos/index.js";
import logsRouter from "./logs/index.js";
import authRouter from "./auth/index.js";

const router = express.Router();

router.use("/todos", todosRouter);
router.use("/columns", columnsRouter);
router.use("/logs", logsRouter);
router.use("/auth", authRouter);

export default router;
