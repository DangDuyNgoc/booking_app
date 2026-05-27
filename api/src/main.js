import "dotenv/config";
import cors from "cors";
import express from "express";
import { config } from "./config/env.js";
import { prisma } from "./database/prisma.client.js";
import { createApiRouter } from "./routes.js";
import { errorMiddleware } from "./common/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", createApiRouter());
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("API is running....");
})

const server = app.listen(config.apiPort, () => {
  console.log(`Server in running on ${process.env.NODE_ENV} mode on port ${config.apiPort}`);
});

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
