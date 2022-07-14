import express from "express";
import { readLog, insertLog } from "./logs.ctrl.js";

const router = express.Router();

router.post("/", insertLog);
router.get("/", readLog);

export default router;
