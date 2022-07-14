import express from "express";
import cors from "cors";
import APIRouter from "./api/index.js";
import readTodos from "./handleDB/read.js";

const app = express();
const port = 3000;

app.use(cors({ credentials: true }));
app.use(express.json());
app.use("/", (req, res) => {
  readTodos();
  res.json({message: '성공'});
});
app.use("/api", APIRouter);

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
