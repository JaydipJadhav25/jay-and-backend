import JsonWebTokenError  from "jsonwebtoken"
import {user}  from "../models/user.model.js"
const secretkey ="jaydipdhananjayjadhavJADHAVJAYDIPDHANANJAY";



// const secretkey = "jayandbackend";

 export const verifyjwt = async(req, res , next) => {
  try {

    // const token  = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer" , "")
    const token  = req.cookies.accesstoken;
    console.log("access token in auth middlewaer : " , token )
    
    
    if(!token){
        res.json({
            massage  : "unauthorized request "
        })
    }

    console.log("decoded processing.................................",process.env.ACCESS_TOKEN_SECRET)
//    const decodedtoken =   Jwt.verify(token ,JsonWebTokenError.verify(token,secretkey))
const decodedtoken  = JsonWebTokenError.verify(token, secretkey)


   console.log("decoded infromation : " , decodedtoken)
   console.log("decoding is done and  infromattion : " , decodedtoken)

   const exuser = await user.findById({
    _id :decodedtoken._id
   }).select("-password -refreshtoken")

   console.log("useer chi info : " , exuser)

   if(!exuser){
    res.json({
        massage : "user is not existed"
    })
   }
   req.user = exuser;

   console.log("successfully user injected in user object ................. n dada")

   next();





  } catch (error) {
    console.log(error);
    console.log("fail verify jwt processes.................")
    
  }




}
// export {verifyjwt}