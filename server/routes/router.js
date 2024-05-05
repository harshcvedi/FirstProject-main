const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const productdb=require("../models/productSchema");
var bcrypt = require("bcryptjs");
const authenticate=require("../middleware/authenticate");

const fetch=require('node-fetch-commonjs');
const google = require("../models/googleSchema");
//for user register...api create

router.post("/register",async(req,res)=>{
   

    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }
    try{

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {

            const finalUser = new userdb({
                name, email, password, cpassword
            });

            // here password hashing

            const storeData = await finalUser.save();
            

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    }catch(error){
        res.status(422).json(error);
        console.log("catch block error");
    }


});


router.post("/login", async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});


router.get("/validuser", authenticate, async (req, res) => {

    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});




//user logout
router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});







//for dashboard api create
router.post("/adduser",async (req,res)=>{
    // console.log(req.body);

    const {name,email,age,mobile,add}=req.body;
    console.log(req.body);

    if(!name || !email || !age || !mobile || !add){
        res.status(422).json("plz fill the details");
    }
    try {

        const preuser=await productdb.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this user is already present");
        }else{
            const adduser = new productdb({
                name,email,age,mobile,add
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);

        }
        
        
    } catch (error) {
        res.status(422).json(error);
    }
})

//get user data
router.get("/getdata",async(req,res)=>{
    try {
        const userdata=await productdb.find();
        res.status(201).json(userdata);
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
});

//get individual user
router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id}=req.params;

        const userindividual=await productdb.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);

    } catch (error) {
        res.status(422).json(error);
    }
});


//update user
router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id}=req.params;

        const updateuser=await productdb.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateuser);
        res.status(201).json(updateuser);
    } catch (error) {
        res.status(422).json(error);
    }
});

//delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id}=req.params;

        const deleteuser=await productdb.findByIdAndDelete({_id:id});

        console.log(deleteuser);
        res.status(201).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
});


// const keysecret = "harshchaturvedihafhsvhaghjhvhsbahvhsvhbs";

// const jwt = require("jsonwebtoken");

//facebook route
// router.post('/facebooklogin',(req,res)=>{
//     const {userId,accessToken}=req.body;

//     let graphurl=`https://graph.facebook.com/v2.11/${userId}/?fields=id,name,email&access_token=${accessToken}`;

//     fetch(graphurl,{
//         method:'GET'
//     })


    
//     .then(response=>response.json())
//     .then(response=>{
//         const{email,name}=response;
//         userdb.findOne({ email }).exec()
//   .then(user => {
//     if (user) {
//       const token = jwt.sign({ _id: user._id }, keysecret, { expiresIn: '7d' });
//       const { _id, name, email } = user;



//       res.json({
//         token,
//         user: { _id, name, email }
//       });
//     } else {
//       let password = email + keysecret;
//       let cpassword = email + keysecret;
//       let newuser = new userdb({ name, email, password, cpassword });
//       return newuser.save();
//     }
//   })
//   .then(data => {
//     if (data) {
//       const token = jwt.sign({ _id: data._id }, keysecret, { expiresIn: '7d' });
//       const { _id, name, email } = data;

//       res.json({
//         token,
//         user: { _id, name, email }
//       });
//     }
//   })
//   .catch(err => {
//     return res.status(400).json({
//       error: "Something went wrong..."
//     });
//   });

//     });

// })

module.exports=router
