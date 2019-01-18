const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const actionsRouter = require("./routers/actionsRouter");
const projectsRouter = require("./routers/projectsRouter");

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

const port = 5000;

server.listen(port, () => console.log(`Server up and listening on ${port}`));
