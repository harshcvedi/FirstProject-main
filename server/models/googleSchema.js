const mongoose = require("mongoose");

const googleSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});


const google = new mongoose.model("googles",googleSchema);

module.exports = google;


