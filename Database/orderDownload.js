const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderDownloadSchema = new Schema({
  userId: {
    type: String,
    default: "userName",
  },
  fileLink: {
    type: String,
    default: "pass",
  },
  fileId: {
    type: String,
    default: "pass",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("orderDownload", OrderDownloadSchema);
