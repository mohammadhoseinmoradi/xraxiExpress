const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  userId: {
    type: String,
    default: "userName",
  },
  printOrderList: {
    type: Array,
    default: [],
  },
  downloadOrderList: {
    type: Array,
    default: [],
  },
  editThesisOrderList: {
    type: Array,
    default: [],
  },
  printThesisOrderList: {
    type: Array,
    default: [],
  },
  locationId: { type: String, default: "" },
  postType: { type: String, default: "" },
  finalPrice: { type: String, default: "" },
  discountCode: { type: String, default: "" },
  orderStatus: { type: String, default: "inprogress" },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("order", CardSchema);
