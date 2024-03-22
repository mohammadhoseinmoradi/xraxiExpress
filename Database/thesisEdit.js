const mongoose = require("mongoose");
const { Schema } = mongoose;

const ThesisEditSchema = new Schema({
  userId: {
    type: String,
    default: "userName",
  },
  fileLink: {
    type: String,
    default: "pass",
  },
  formatLink: {
    type: String,
    default: "pass",
  },
  description: {
    type: String,
    default: "pass",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("thesisEdit", ThesisEditSchema);
