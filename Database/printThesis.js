const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrintThesisSchema = new Schema({
  userId: {
    type: String,
    default: "",
  },
  fileLink: {
    type: String,
    default: "pass",
  },

  fileId: {
    type: String,
    default: "pass",
  },

  printType: {
    type: String,
    default: "",
  },
  printSide: {
    type: String,
    default: "default@gmail.com",
  },
  allPrintPageNumber: {
    type: String,
    default: "",
  },
  blackWhitePrintPage: {
    type: Array,
    default: ["0", "0"],
  },
  bindingType: {
    type: String,
    default: "0",
  },
  binding: {
    type: String,
    default: "0",
  },
  bindingColor: {
    type: String,
    default: "0",
  },
  halfColorPrintPageRange: {
    type: Array,
    default: ["0", "0"],
  },
  fullColorPrintPageRange: {
    type: Array,
    default: ["0", "0"],
  },
  description: {
    type: String,
    default: "0",
  },

  price: {
    type: String,
    default: "",
  },
  coverDesignStatus: {
    type: Boolean,
    default: false,
  },
  coverDesignId: {
    type: String,
    default: "",
  },
  signatureProfessorStatus: {
    type: Boolean,
    default: false,
  },
  signatureProfessorId: {
    type: String,
    default: "",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("printThesis", PrintThesisSchema);
