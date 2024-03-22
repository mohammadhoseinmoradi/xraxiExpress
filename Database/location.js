const mongoose = require("mongoose");
const { Schema } = mongoose;
const LocationSchema = new Schema({
    userId:{
        type:String,
        default:''
    },
    postAddress:{
        type:String,
        default:'',
    },
    province:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    district:{
        type:String,
        default:''
    },
    postalCode:{
        type:String,
        default:'0000000000'
    },
    houseNumber:{
        type:String,
        default:''
    },
    houseUnit:{
        type:String,
        default:''
    },

    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("location", LocationSchema);
