const mongoose=require("mongoose");
const gamesschma=mongoose.Schema({
    name:String,
    version:Number,
    rating:Number,
    userid:String
})
const gamemodel=mongoose.model("game",gamesschma);
module.exports={
    gamemodel
}