import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { RegisterRoutes } from "./routes";
import { ValidateError } from "tsoa";

const setupEnv = (): void => {
  dotenv.config();
};
setupEnv();
const app = express();
const port = process.env.DEV_PORT;

app.use(morgan("dev")); // logging middleware
app.use(express.json());
app.use(cors());

app.use("/", (req: Request, _res: Response, next: NextFunction) => {
  console.log("log incoming request path: " + req.originalUrl);
  next();
});

RegisterRoutes(app);

app.use(
  (
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
  ): Response | void => {
    console.log("error handled here");
    console.log(err);
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
