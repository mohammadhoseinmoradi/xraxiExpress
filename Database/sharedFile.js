const mongoose = require("mongoose");
const { Schema } = mongoose;

const SharedFileSchema = new Schema({
  userId: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "pass",
  },
  university: {
    type: String,
    default: "09100000000",
  },
  professor: {
    type: String,
    default: "",
  },
  college: {
    type: String,
    default: "",
  },
  fileNumber: {
    type: String,
    default: "",
  },
  viewNumber: {
    type: String,
    default: "",
  },
  likeNumber: {
    type: String,
    default: "0",
  },
  printNumber: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  sharedType: {
    type: String,
    default: "public",
  },
  reasonDelete: {
    type: String,
    default: "",
  },

  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("sharedFile", SharedFileSchema);
