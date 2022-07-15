import express from "express";
import cors from "cors";
import APIRouter from "./api/index.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config()
const port = 3000;

app.use(cors({credentials: true}));
app.use(express.json());
app.use("/api", APIRouter);

app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`);
});
