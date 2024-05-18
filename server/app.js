require('dotenv').config();
const express=require('express');
const app=express();
const port=8080;
const cookiParser = require("cookie-parser")
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

// const fetch=require('node-fetch');

const FacebookStrategy = require('passport-facebook').Strategy;


const mongoose=require('mongoose');
const connectDB=async()=>{
    await mongoose.connect(`mongodb+srv://harsh:7AmTb9O7c2COOtuo@harsh.clxssap.mongodb.net/mydb`)

    console.log("Db connected");
}
connectDB();

const router=require("./routes/router")




const users=require("./models/userSchema");
const products=require("./models/productSchema");
const googles = require("./models/googleSchema");




const cors=require("cors");



app.use(cors());
app.use(express.json());
app.use(router);
app.use(cookiParser());


// setup session
app.use(session({
    secret:"78784545112sdsffsdshdsbjxsfsfhsgdgsgdgsdsvdvsvdgsdsd",
    resave:false,
    saveUninitialized:true
}));

// setuppassport
app.use(passport.initialize());
app.use(passport.session());


app.listen(port,()=>{
    console.log(`server connected at port no : ${port}`);
});









