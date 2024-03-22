const mongoose = require("mongoose");
const { Schema } = mongoose;

const WalletSchema = new Schema({

    userId:{
        type:String,
        default:""
    },
    balance:{
        type:String,
        default:""
    },
    customerValue:{
        type:String,
        default:""
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("wallet", WalletSchema);
