const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const router = express.Router();
const mongoose = require("mongoose");
const AuthController = require("./Controller/authController");
const UploaderController = require("./Controller/uploaderController");
const uploader = new UploaderController();
const DiscountController = require("./Controller/discount");
const discount = new DiscountController();
const BaseMiddleware = require("./Middleware/baseMiddleware");
const Middleware = new BaseMiddleware();

class AppRunner {
  #port;
  #app;
  constructor(port, app) {
    this.#port = port;
    this.#app = app;
  }
  run() {
    this.#app.listen(this.#port, () => {
      console.log(`Example app listening`);
    });
  }
  connectDB() {
    const url = "mongodb://127.0.0.1/xraxi";

    try {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });

    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
    return;
  }
}

const newServer = new AppRunner(3000, app);

newServer.connectDB();
newServer.run();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
app.post(
  "/orderPrint",
  Middleware.verifyToken,
  AuthController.addServicesPrint
);
app.post(
  "/orderThesisPrint",
  Middleware.verifyToken,
  AuthController.addThesisPrint
);
app.post(
  "/orderThesisEdit",
  Middleware.verifyToken,
  AuthController.addThesisEdit
);
app.post(
  "/orderDownload",
  Middleware.verifyToken,
  AuthController.addOrderDownload
);
app.post("/order", Middleware.verifyToken, AuthController.addOrder);
app.get("/sharedFiles", AuthController.sharedFileList);
app.post("/calPrice", AuthController.calculatePrice);
app.get("/cart", Middleware.verifyToken, AuthController.CartList);
app.post("/locations", Middleware.verifyToken, AuthController.addLocation);
app.get("/locations", Middleware.verifyToken, AuthController.getLocation);
app.use("/uploader", Middleware.verifyToken, uploader.router);
app.use("/discount", Middleware.verifyToken, discount.router);
