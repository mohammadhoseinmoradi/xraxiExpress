const mongoose = require("mongoose");
const { Schema } = mongoose;

const DiscountSchema = new Schema({

    Code:{
        type:String,
        default:"userName"
    },
    userAccess:{
        type:Array,
        default:["All"]
    },
    userUsed:{
        type:Array,
        default:[]
    },
    expiredTime:{
        type:String,
        default:""
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("discount", DiscountSchema);
