const mongoose=require("mongoose")
require("dotenv").config()
const connected=mongoose.connect(process.env.mongourl);
module.exports={
    connected
}