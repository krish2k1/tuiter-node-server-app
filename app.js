import express from "express";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // Allow all origins
      origin: "http://https://a5--stunning-zabaione-a706c6.netlify.app/",
        callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow all CRUD operations
  })
);
app.use(express.json());
TuitsController(app);
HelloController(app);
UserController(app);
app.listen(process.env.PORT || 4000);
AuthController(app);
