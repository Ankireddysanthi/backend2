const mongoose = require("mongoose");
const Userschma = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    pass: {
        type: String,
    }
})
const Usermodle = mongoose.model("user", Userschma);
module.exports = {
    Usermodle
}