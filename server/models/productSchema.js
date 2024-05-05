const mongoose=require('mongoose');



const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    add:{
        type:String,
        required:true
    }
});

const products=new mongoose.model("products",productSchema);

module.exports=products;






