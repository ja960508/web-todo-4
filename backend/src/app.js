import express from "express";
import cors from "cors";
import APIRouter from "./api/index.js";

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(express.json());
app.use("/api", APIRouter);

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
