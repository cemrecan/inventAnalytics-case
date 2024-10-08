import express from "express";
import userRouter from "./routes/userRoutes";
import bookRouter from "./routes/bookRoutes";
import { AppDataSource } from "../ormconfig";

const app = express();
const port = 3000;

app.use(express.json());

// Initialize DataSource
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // server setup and middleware (e.g., app.use(...))

    app.use("/users", userRouter);
    app.use("/books", bookRouter);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
