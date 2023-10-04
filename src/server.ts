import express, { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import log4js from "log4js";
import bookRoutes from "./routes/book";

const app: any = express();
const PORT: number = 3000;
const CONNECTION_URI: string = "mongodb://localhost:27017/book_ts";
const log = log4js.getLogger("entrypoint");
log.level = "debug";

// * Security & Primary & Logging
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// * Routing
app.use(bookRoutes);

// * Database Connection
mongoose.connect(
  CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      log.error(err);
    }
    log.info("MongoDB is Connected");
  }
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json({ succes: true, message: "Hello From NodeJS Typescript" });
});

app.listen(PORT, (err: any) => {
  if (err) {
    log.error(err);
  }
  log.info(`Server Up on Port: ${PORT}`);
});
