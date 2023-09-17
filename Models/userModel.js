const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:10,
    },
    pic: {
      type: "String",
      //required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
 },
 {
    timestamps:true
 }
)
Userschema.methods.matchPassword=async function(enteredPassword){
             return await bcrypt.compare(enteredPassword,this.password);
} 
Userschema.pre('save',async function(next){
        if(this.isModified){
            const salt= await bcrypt.genSalt(10);
            this.password=await bcrypt.hash(this.password,salt);
        }
        next();
})
const UserModel=mongoose.model("UserModel",Userschema);
module.exports=UserModel;