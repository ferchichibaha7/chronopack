import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

import { sequelize, connectAuthenticate } from "../config/database";
import user from "./routes/api/user";
import auth from "./routes/api/auth";

const app = express();

// Connect to DB
connectAuthenticate();
sequelize.sync({logging:false}).then(async res=>{
  console.log("Sync done");
});

// Express configuration
app.use(cors());
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);












// create admin if not exist on start server
///////////////////////////////////////////














export default server;
