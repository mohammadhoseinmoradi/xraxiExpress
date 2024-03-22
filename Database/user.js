const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({

    username:{
        type:String,
        default:"userName"
    },
    password:{
        type:String,
        default:"pass"
    },
    phoneNumber:{
        type:String,
        default:"09100000000"
    },
    avatar:{
        type:String,
        default:""
    },
    email:{
      type:String,
      default:'default@gmail.com'
    },
    customerNumber:{
        type:String,
        default:""
    },
    points:{
        type:String,
        default:'0'
    },

    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("user", UserSchema);
