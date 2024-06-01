import mongoose ,{Schema} from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

const userschema = new Schema(
    {

    username  :{
        type :String ,
        required :true ,
        unique :true,
        lowecase : true,
        trim : true , 
        index : true
    },
    email :{
        type :String ,
        required :true ,
        unique :true,
        lowecase : true,
        trim : true , 
     
    },
    fullname :{
        type :String ,
        required :true ,
        trim : true , 
        index : true
     
    },

    avatar : {
        type  :String , //cludinary url
        required  :true
    },
    coverImage :{
        type : String
    },
    watchHistory :{
        type :Schema.Types.ObjectId,
        ref:"video"
    },
    password : {
        type :String,
        required : [true , "password is required!"]
    },
    refreshtoken:{
        type :String
    }
},{
    timestamps:true
}

)



userschema.pre("save" , async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
  next();

})
userschema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password , this.password)

}
userschema.methods.genrateaccesstoken = function(){
   return Jwt.sign(
        {
            //okok function direct data base made data gety
            _id:this._id,
            email:this.email,
            username :this.username,
            fullname :this.fullname
        },
        // process.env.ACCESS_TOKEN_SECRET,
        "jaydipdhananjayjadhavJADHAVJAYDIPDHANANJAY",
        {
            expiresIn :process.env.ACCESS_TOKEN_EXPIRY  
            
        }
    )
}
userschema.methods.genraterefreshtoken = function(){

    return Jwt.sign(
        {
            _id:this._id
        },
        // process.env.REFRESH_TOKEN_SECRET,
        "jayandbackend",
        {
            expiresIn :process.env.REFRESH_TOKEN_EXPIRY 
        }
    )

}



export  const user = mongoose.model("user" , userschema)