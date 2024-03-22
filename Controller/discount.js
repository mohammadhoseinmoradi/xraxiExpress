const express = require("express");
const DatabaseInterface = require("../Utitlity/DatabaseInteface");
const discountDatabase = require("../Database/discount");
class Discount {
  discountDatabase = discountDatabase;
  #Database = new DatabaseInterface();
  constructor() {
    this.router = express.Router();

    // روت برای آپلود فایل
    this.router.post("/", this.create.bind(this));
    this.router.get("/:code", this.check.bind(this));
  }

  async create(req, res, next) {
    let queryDatabase = await this.#Database.create(this.discountDatabase, {
      userId: req.userId,
      Code: req.body.Code,
      userAccess: req.body.userAccess,
      userUsed: req.body.userUsed,
      expiredTime: req.body.expiredTime,
    });

    res.json({ msg: " با موفقیت  ", data: queryDatabase });
  }
  async check(req, res, next) {
    let queryDatabase = await this.#Database.get(
      this.discountDatabase,
      { Code: req.params.code },
      {}
    );
    if (
      this.checkItemDateExpire(queryDatabase[0].createdAt) &&
      this.checkItemInArray(queryDatabase[0].userUsed, req.userId) &&
      !this.checkItemInArray(queryDatabase[0].userAccess, req.userId)
    ) {
      // اعمال کد تخفیفی رو هزینه و برگشت هزینه و بروزرسانی کد تخفیف
    }

    res.json({
      msg: "فایل‌ها با موفقیت به فایل های اشتراکی افزوده گردید ",
      data: queryDatabase,
    });
  }
  checkItemInArray(arr, item) {
    // استفاده از indexOf برای بررسی وجود مقدار در آرایه
    if (arr.indexOf(item) !== -1) {
      // مقدار مورد نظر در آرایه وجود دارد
      return true;
    } else {
      // مقدار مورد نظر در آرایه وجود ندارد
      return false;
    }
  }
  checkItemDateExpire(Date) {
    return true;
    // زمان حال تفاوتش با زمان ایجاد کد تخیفیف
  }
}

module.exports = Discount;
