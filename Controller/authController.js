const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BaseController = require("../Controller/BaseController");
const AuthService = require("../Service/authService");
const authService = new AuthService();
const UserService = require("../Service/userService");
const userService = new UserService();
const userDatabaseModel = require("../Database/user");
const sharedFileDatabase = require("../Database/sharedFile");
const thesisEditDatabase = require("../Database/thesisEdit");
const printThesisDatabase = require("../Database/printThesis");
const DatabaseInterface = require("../Utitlity/DatabaseInteface");
const locationDatabase = require("../Database/location");
const printService = require("../Database/printService");
const orderDownload = require("../Database/orderDownload");
const order = require("../Database/order");

class authController {
  #userDatabase = userDatabaseModel;
  thesisEditDatabase = thesisEditDatabase;
  printThesisDatabase = printThesisDatabase;
  locationDatabase = locationDatabase;
  orderDownload = orderDownload;
  orderDatabase = order;
  #sharedFileDatabase = sharedFileDatabase;
  #Database = new DatabaseInterface();
  authService = authService;
  userService = userService;
  printServiceDatabase = printService;
  priceSchema = {
    A2: {
      oneSide: {
        blackWhite: "100",
        halfColor: "200",
        fullColor: "300",
      },
      towSide: {
        blackWhite: "150",
        halfColor: "250",
        fullColor: "350",
      },
    },
    A3: {
      oneSide: {
        blackWhite: "120",
        halfColor: "220",
        fullColor: "320",
      },
      towSide: {
        blackWhite: "420",
        halfColor: "520",
        fullColor: "620",
      },
    },
    A4: {
      oneSide: {
        blackWhite: "190",
        halfColor: "290",
        fullColor: "390",
      },
      towSide: {
        blackWhite: "490",
        halfColor: "590",
        fullColor: "690",
      },
    },
    A5: {
      oneSide: {
        blackWhite: "140",
        halfColor: "240",
        fullColor: "340",
      },
      towSide: {
        blackWhite: "440",
        halfColor: "540",
        fullColor: "640",
      },
    },
  };

  verifyPhoneNumber = (req, res) => {
    try {
      let phoneNumber = req.body.phoneNumber;
      let code = this.authService.generateCode();
      let sendSms = this.authService.sendSMS(phoneNumber, code);
      return code;
    } catch (error) {
      throw error;
    }
  };
  register = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let userData = {
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: hashedPassword,
      };
      let Response = await this.userService.create(
        this.#userDatabase,
        userData
      );
      res.json(Response);
    } catch (e) {
      res.json(e);
    }
  };
  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      let queryParameters = { username: username };
      const user = await this.userService.readByParameter(
        this.#userDatabase,
        queryParameters,
        {}
      );
      console.log(user);
      if (!user[0]) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const token = jwt.sign({ userId: user[0]._id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.json(error);
    }
  };
  addServicesPrint = async (req, res) => {
    try {
      let DataModel = {
        fileLink: req.body.fileLink,
        fileId: req.body.fileId,
        paperSize: req.body.paperSize,
        printType: req.body.printType,
        printSide: req.body.printSide,
        allPrintPageNumber: req.body.allPrintPageNumber,
        blackWhitePrintPageNumber: req.body.blackWhitePrintPageNumber,
        numberCopies: req.body.numberCopies,
        bindingType: req.body.bindingType,
        bindingColor: req.body.bindingColor,
        binding: req.body.binding,
        halfColorPrintPageRange: req.body.halfColorPrintPageRange,
        fullColorPrintPageRange: req.body.fullColorPrintPageRange,
        description: req.body.description,
        price: req.body.price,
        userId: req.userId,
      };
      console.log(req.userId);
      let queryDatabase = await this.#Database.create(
        this.printServiceDatabase,
        DataModel
      );
      res.json({ data: queryDatabase });
    } catch (error) {
      res.json(error);
    }
  };
  addThesisPrint = async (req, res) => {
    try {
      let DataModel = {
        fileLink: req.body.fileLink,
        fileId: req.body.fileId,
        printType: req.body.printType,
        printSide: req.body.printSide,
        allPrintPageNumber: req.body.allPrintPageNumber,
        blackWhitePrintPageNumber: req.body.blackWhitePrintPageNumber,
        numberCopies: req.body.numberCopies,
        bindingType: req.body.bindingType,
        bindingColor: req.body.bindingColor,
        binding: req.body.binding,
        halfColorPrintPageRange: req.body.halfColorPrintPageRange,
        fullColorPrintPageRange: req.body.fullColorPrintPageRange,
        description: req.body.description,
        price: req.body.price,
        coverDesignStatus: req.body.coverDesignStatus,
        coverDesignId: req.body.coverDesignId,
        signatureProfessorStatus: req.body.signatureProfessorStatus,
        signatureProfessorId: req.body.signatureProfessorId,
        userId: req.userId,
      };
      console.log(req.userId);
      let queryDatabase = await this.#Database.create(
        this.printThesisDatabase,
        DataModel
      );
      res.json({ data: queryDatabase });
    } catch (error) {
      res.json(error);
    }
  };
  addThesisEdit = async (req, res) => {
    try {
      let DataModel = {
        fileLink: req.body.fileLink,
        formatLink: req.body.formatLink,
        userId: req.userId,
      };
      console.log(req.userId);
      let queryDatabase = await this.#Database.create(
        this.thesisEditDatabase,
        DataModel
      );
      res.json({ data: queryDatabase });
    } catch (error) {
      res.json(error);
    }
  };
  addOrderDownload = async (req, res) => {
    try {
      let DataModel = {
        fileLink: req.body.fileLink,
        fileId: req.body.fileId,
        userId: req.userId,
      };
      console.log(req.userId);
      let queryDatabase = await this.#Database.create(
        this.orderDownload,
        DataModel
      );
      res.json({ data: queryDatabase });
    } catch (error) {
      res.json(error);
    }
  };
  sharedFileList = async (req, res) => {
    try {
      let queryParameters = {};
      const sharedFile = await this.#Database.get(
        this.#sharedFileDatabase,
        queryParameters,
        {}
      );
      res.json({ data: sharedFile });
    } catch (error) {
      res.json(error);
    }
  };
  CartList = async (req, res) => {
    try {
      let queryParameters = { userId: req.userId };
      const printServiceData = await this.#Database.get(
        this.printServiceDatabase,
        queryParameters,
        {}
      );
      const printThesisData = await this.#Database.get(
        this.printThesisDatabase,
        queryParameters,
        {}
      );
      const thesisEditData = await this.#Database.get(
        this.thesisEditDatabase,
        queryParameters,
        {}
      );
      const orderDownloadData = await this.#Database.get(
        this.orderDownload,
        queryParameters,
        {}
      );
      res.json({
        Data: {
          printService: printServiceData,
          printThesis: printThesisData,
          thesisEdit: thesisEditData,
          orderDownload: orderDownloadData,
        },
      });
    } catch (error) {
      res.json(error);
    }
  };
  addLocation = async (req, res) => {
    try {
      let DataModel = {
        userId: req.userId,
        postAddress: req.body.postAddress,
        province: req.body.province,
        city: req.body.city,
        district: req.body.district,
        postalCode: req.body.postalCode,
        houseNumber: req.body.houseNumber,
        houseUnit: req.body.houseUnit,
      };
      let queryDatabase = await this.#Database.create(
        this.locationDatabase,
        DataModel
      );
      res.json(queryDatabase);
    } catch (error) {
      res.json(error);
    }
  };
  getLocation = async (req, res) => {
    try {
      let queryParameters = { userId: req.userId };
      const locations = await this.#Database.get(
        this.locationDatabase,
        queryParameters,
        {}
      );
      res.json({ Data: locations });
    } catch (error) {
      res.json(error);
    }
  };
  calculatePrice = async (req, res) => {
    let pageSize = req.body.pageSize;
    let pageSide = req.body.pageSide;
    let blackWhitePageNumber = req.body.blackWhitePageNumber;
    let halfColorPageNumber = req.body.halfColorNumber;
    let fullColorPageNumber = req.body.fullColorNumber;
    let baseBlackWhitePrice =
      this.priceSchema[pageSize]?.[pageSide]?.blackWhite;
    let baseHalfColorPrice = this.priceSchema[pageSize]?.[pageSide]?.halfColor;
    let baseFullColorPrice = this.priceSchema[pageSize]?.[pageSide]?.fullColor;
    let finalPrice =
      +baseBlackWhitePrice * +blackWhitePageNumber +
      +baseHalfColorPrice * +halfColorPageNumber +
      +baseFullColorPrice * +fullColorPageNumber;
    res.json({ data: finalPrice });
  };
  addOrder = async (req, res) => {
    let printOrderList = req.body.printOrderList;
    let downloadOrderList = req.body.downloadOrderList;
    let editThesisOrderList = req.body.editThesisOrderList;
    let printThesisOrderList = req.body.printThesisOrderList;
    let locationId = req.body.locationId;
    let postType = req.body.postType;
    let DataModel = {
      userId: req.userId,
      printOrderList: printOrderList,
      downloadOrderList: downloadOrderList,
      editThesisOrderList: editThesisOrderList,
      printThesisOrderList: printThesisOrderList,
      locationId: locationId,
      postType: postType,
    };
    let printOrderPrice = 0;
    let downloadOrderPrice = 0;
    let editThesisOrderPrice = 0;
    let printThesisOrderPrice = 0;
    for (let item of printOrderList) {
      let printQueryParameters = { _id: item };
      const purchas = await this.#Database.get(
        this.printServiceDatabase,
        printQueryParameters,
        {}
      );
      console.log("Print::::::::::::::::::", purchas);
      printOrderPrice = +purchas[0].price + printOrderPrice;
    }
    for (let item of downloadOrderList) {
      let printQueryParameters = { _id: item };
      const purchas = await this.#Database.get(
        this.orderDownload,
        printQueryParameters,
        {}
      );
      downloadOrderPrice = +purchas[0].finalPrice + downloadOrderPrice;
    }
    for (let item of editThesisOrderList) {
      let printQueryParameters = { _id: item };
      const purchas = await this.#Database.get(
        this.thesisEditDatabase,
        printQueryParameters,
        {}
      );
      editThesisOrderPrice = +purchas[0].finalPrice + editThesisOrderPrice;
    }
    for (let item of printThesisOrderList) {
      let printQueryParameters = { _id: item };
      const purchas = await this.#Database.get(
        this.printThesisDatabase,
        printQueryParameters,
        {}
      );
      printThesisOrderPrice = +purchas[0].finalPrice + printThesisOrderPrice;
    }
    console.log("11111111111111111111111111");
    console.log("11111111111111111111111111");
    console.log(
      printThesisOrderPrice,
      printOrderPrice,
      downloadOrderPrice,
      editThesisOrderPrice
    );
    console.log("11111111111111111111111111");
    console.log("11111111111111111111111111");
    console.log("11111111111111111111111111");
    let finalPrice =
      +printThesisOrderPrice +
      +printOrderPrice +
      +downloadOrderPrice +
      +editThesisOrderPrice;

    DataModel.finalPrice = `${finalPrice}`;
    let queryDatabase = await this.#Database.create(
      this.orderDatabase,
      DataModel
    );
    res.json(queryDatabase);
  };
}

module.exports = new authController();
