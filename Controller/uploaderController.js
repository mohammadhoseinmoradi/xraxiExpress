const express = require("express");
const multer = require("multer");
const fileDatabase = require("../Database/orderFile");
const sharedFileDatabase = require("../Database/sharedFile");
const DatabaseInterface = require("../Utitlity/DatabaseInteface");
class Uploader {
  #fileDatabase = fileDatabase;
  #sharedFileDatabase = sharedFileDatabase;
  #Database = new DatabaseInterface();
  constructor() {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log("df");
        cb(null, "download/"); // مسیر ذخیره فایل‌های آپلود شده
      },
      filename: function (req, file, cb) {
        console.log("vdfvd");
        console.log(file.originalname);
        req.fileName = file.originalname;
        cb(null, file.originalname); // نام فایل آپلود شده را به عنوان نام فایل ذخیره شده استفاده می‌کنیم
      },
    });

    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize: 200 * 1024 * 1024, // حداکثر اندازه فایل (در اینجا 200 مگابایت)
        files: 5, // تعداد فایل‌ها (حداکثر 5 فایل مجاز است)
        fileFilter: function (req, file, cb) {
          // تنظیم فیلتر برای نوع فایل‌های مجاز
          if (
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/msword"
          ) {
            console.log("1");
            cb(null, true);
          } else {
            cb(new Error("فقط فایل‌های PDF و Word مجاز هستند"));
          }
        },
      },
    });

    this.router = express.Router();

    // روت برای آپلود فایل
    this.router.post(
      "/upload",
      this.upload.array("files", 5),
      this.uploadFile.bind(this)
    );
    this.router.post(
      "/sharedFile",
      this.upload.array("files", 5),
      this.sharedUploadFile.bind(this)
    );
  }

  // متد برای آپلود فایل
  async uploadFile(req, res, next) {
    // اگر فایل با موفقیت آپلود شد، پاسخی به کاربر برمی‌گردانیم
    // userId
    // fileLink
    let queryDatabase = await this.#Database.create(this.#fileDatabase, {
      userId: req.userId,
      fileLink: `../download/${req.fileName}`,
    });

    res.json({ msg: "فایل‌ها با موفقیت آپلود شدند", data: queryDatabase });
  }
  async sharedUploadFile(req, res, next) {
    // اگر فایل با موفقیت آپلود شد، پاسخی به کاربر برمی‌گردانیم
    // userId
    // fileLink
    let queryDatabase = await this.#Database.create(this.#sharedFileDatabase, {
      userId: req.userId,
      fileName: req.fileName,
      university: req.body.university,
      college: req.body.college,
      description: req.body.description,
      sharedType: req.body.sharedType,
      professor: req.body.professor,
    });

    res.json({
      msg: "فایل‌ها با موفقیت به فایل های اشتراکی افزوده گردید ",
      data: queryDatabase,
    });
  }
}

module.exports = Uploader;
