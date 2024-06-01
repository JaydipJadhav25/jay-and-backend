import {Apierror} from "../utils/aplierror.js"
import {Apiresponse} from "../utils/apliresponse.js"
import {user}  from "../models/user.model.js"
// import users  from "../models/user.model.js"
import {uploadfileoncloudinary} from "../utils/cloudinary.js"
import JsonWebTokenError from "jsonwebtoken"
const secretkeyofrefrectoken ="jayandbackend";





const genratAccesstokenAndRefershToken = async(userid) =>{

    //user find kru 
    const exuser = await user.findById(userid);


    if(!exuser){
        throw new Apierror(404 , "User is not found ");
    }

    //user find zala so
    // genrat token
    const refreshtoken = exuser.genraterefreshtoken();
    exuser.refreshtoken= refreshtoken;
    await exuser.save({validateBeforsave : false});


    const accesstoken = exuser.genrateaccesstoken();


    return {refreshtoken , accesstoken}

}




// import {asynchandler} from "../utils/asynchandler.js"


// const registeruser = asynchandler(  async (req , res) =>{
//     res.status(200).json(
//         {
//             message : "ok"
//         }
//     )
//     // const {}= req.body

// })
// yachya mule error yet hoti asynchandler ............................


const registeruser =  async (req , res) =>{
    // res.status(200).json(
    //     {
    //         message : "ok"
    //     }
    // )

    //1..........
    const {fullname, email, username , password}= req.body
    console.log("fullname : " , fullname)
    console.log("eamil: " , email)
    console.log("username : " , username)
    console.log("done with all data of user")

    // res.send("hiiiiiiiiiiiiiiiiiiiii")


    //validation it not empty

    if(fullname === ""){
        // throw new Apierror(400 , "fullname id required")
        res.status(400).json( {
            massage : "fullname id required"
        })
    }
  

    if(email === ""){
        // throw new Apierror(400 , "eamil id required")
        res.status(400).json( {
            massgae : "eamil id required"
        })
    }
 
     if(
        [fullname , email, username ,password].some((field) =>field?.trim() === "" )
     ){
        // throw new Apierror(400 , "all field are  required")
        res.status(400).json({
            massage : "all fields requried"
        })
     }

     //user is already exits....................................


     const existeduser = await user.findOne(
        {

            $or :[ {username} , {email}]
        }
     )
     if(existeduser){
        // throw new Apierror(409 , "user with already exites")
        res.status(400).json({
            massgae : "user with already exites"
        })

     }

     //check for images , check for avatar
      
    // const avatarloaclpath =  req.fiels?.avatar[0]?.path 
    // const coverimageloaclpath =  req.fiels?.coverimgae[0]?.path 
    //   console.log("localpath : ", req.fiels.avatar[0].path)
  const avatarloaclpath =req.files.avatar[0].path 
  
  console.log(avatarloaclpath)
  
    const coverimageloaclpath =  req.fiels?.coverimage[0].path

 


    if(!avatarloaclpath){
    //  throw new Apierror(400 , "avatar file is required (loaclpath)")
    res.json({
        massage : "avatar file is required (loaclpath)"
    })
    }

    //upload on cloudinary

    const avatar = await uploadfileoncloudinary(avatarloaclpath)
    console.log("done......")
    const cloudianryavtharpath = avatar.url;
    

    const coverimage = await uploadfileoncloudinary(coverimageloaclpath)


    if(!avatar){
        // throw new Apierror(400 , "avatar is required on cloudinary")
        res.json({
            massage : "avatar is required on cloudinary"
        })
    }

    //creat user object in db
    // const data = "aavhavaavj" ; 

    const userref =  await user.create(
        {
            fullname,
            avatar : cloudianryavtharpath,
            // avatar : data,
            
            coverimage : coverimage?.url || "",
            // coverimage : data,
            email,
            password,
            // username :username.tolowercase()
            username 
        }
    )

    //remove password from repones 

    const createduser = await user.findById(user._id).select(
        "-password -refreshtoken"
    )

    //check user creation

    // if(!createduser){
    //     throw new Apierror(500 , "someting went wrong while register to user")
    // }

    // return user respones

    // return res.status(200).json(
    //     new Apiresponse(200 ,createduser , "user register successfully....")
    // )
    return res.status(200).json({
        massage : "done",
        userref
    })

    // return res.json({
    //     userref
    // })






}

const logineduser = async(req , res) =>{

    //user req.body
    //eamil ani password
    //check eamil and pawword
    //correct password 
    //genrate token
    //set a cookies 
    //return respones

    const {email , password} = req.body;


    console.log(email)
    console.log(password);




    if(!email){
        // throw new Apierror(404 , "eamil is requrid ");
        res.json({
            massage : "eamil is requrid "
        })
    }


    if(!password){
        // throw new Apierror(404 , "password is is requrid ");
        res.json({
            massage : "password is requrid "
        })
    }
    console.log("done dada................")

//find exteitrd user
    const exuser =await user.findOne({
        email : email
    })
    console.log("user : ", exuser);

    if(!exuser){
        // throw new Apierror(404 , "User is not found ");
        res.json({
            massage : "User is not found "
        })
    }

    const iscorrectpassword =  await exuser.ispasswordcorrect(password);


console.log("password is correct " , iscorrectpassword)

    if(!iscorrectpassword){
        // throw new Apierror(404 , "wrong password");
        res.json({
            massage : " password is wrong "
        })
    
    }


    const {refreshtoken , accesstoken} = await genratAccesstokenAndRefershToken(exuser._id);
console.log(refreshtoken , accesstoken);
    if(!(accesstoken && refreshtoken)){
        // throw new Apierror(404 , "failed to create token ");
        res.json({
            massage : "failed to create token"
        })
    }


    
const option = {
    httpOnly : true,
    secure : true
    
}

     res
    .status(200)
    .cookie("refrecstoken" , refreshtoken  , option)
    .cookie("accesstoken" , accesstoken , option)
    .cookie("demo" , 1000)
    .json({
        massage : "logined user successfully,,,,,,,,,,,,,,",
        refrecestoken : refreshtoken,
        accestoken : accesstoken,
    })
    
    




}


const logoutuser = async (req ,res) =>{

    // const user  = req.user;
    // console.log("user : " , user);

    //database madhun user find krun tyach referstoken tr kel deleted
  const info =  await user.findByIdAndUpdate(
        req.user._id ,{
            $set :{
                refreshtoken :undefined
            }
        },
        {
            new : true
        }
)

console.log("user : " , info)


//ata cookies clear kru 

const option = {
    httpOnly : true,
    secure : true
    
}

res
.status(200)
.clearCookie("refrecstoken",option)
.clearCookie("accesstoken",option)
.clearCookie("demo",option)
.json({
    massage : "logouted user successfully,,,,,,,,,,,,,,",
})





}

const refrecaccesstoken = async(req , res) =>{
try {


//usinng refresh token  new created access token
//karan refresh token validiti long time aste v te database made
// stor kel ahe so mg access token short lived ast tya prt new krnyashi refresh token use krtata

//stpes : 
// refresh token cookies mdhun ghene
//te jwt kadun verify krane 
//ok asel tr user find krene 
//user fine zalya vr uder kdil v alele refresh token same ahe ka te checka krane
//mg genrat new refresh and access tokem
// send and set cookies ans reposnes 



    const incomingrefrectoken = req.cookies.refrecestoken || req.body.refrecestoken
       if(!incomingrefrectoken){
        res.json({
            massage : "unauthorized request"
        })
       }
    
    const decodedtoken =  JsonWebTokenError.verify(incomingrefrectoken , secretkeyofrefrectoken)
    
    
    const exuser = await user.findById(decodedtoken._id)
    
    if(!exuser){
        res.json({
            massage : "invalide token"
        })
       }
    
       if(incomingrefrectoken != user.refrecestoken){
        res.json({
            massage : "invalid refrecs token"
        })
       }
    
    
    const {refreshtoken , accesstoken} =await genratAccesstokenAndRefershToken(exuser._id);
    
    const option = {
        httpOnly : true,
        secure : true
        
    }
    
         res
        .status(200)
        .cookie("refrecstoken" , refreshtoken  , option)
        .cookie("accesstoken" , accesstoken , option)
        .cookie("demo" , 1000)
        .json({
            massage : "Access token Refreshed,,,,,,,,,,,,,,",
            refrecestoken : refreshtoken,
            accestoken : accesstoken,
        })
        
} catch (error) {

    console.log("fail process to refres access token....." , error)
    
}

}

const changePassword = async(req, res) =>{
//algo :
// apn verifyjwt middleawar use kelya mule aplya la user mile req made
//user mdhun new passwor ghetlaa a old password ghetla
//current user req,user madun ghetla 
//current user passs v old password same chek kela 
//ok asel tr newpass set kra allowed kel
//new password update kela 
//res done send kela 

const {oldpassword , newpassword} = req.body;

console.log("newpassword , oldpasswor : " , newpassword  , oldpassword)


//req mdhun user kadane 

const exuser = req.user;

const  currentuser = await user.findById(exuser._id);

//check
const ispassword = await currentuser.ispasswordcorrect(oldpassword)

if(!ispassword){
    res.json({
        massage : "password is wrong"
    })

}

//ok ahe pass set new pass

user.password = newpassword;

 await currentuser.save({
    validateBeforsave :false
 })


 res.json({
    massage : "successfully password changed................."
 })
 .status(200)



}

const currentuser = async(req, res) =>{
  const exuser = req.user 

  const currentuser = await user.findById(exuser._id).select("-password -refreshtoken")

  res.json({
    massage : " current user finded.............",
    currentuser
  })
  .status(202)


}

const updateAccountDetails = async(req, res) => {


    const{ fullname , email} = req.body;
    console.log("fullanme and email : " , fullname  , email);

    if(!fullname ){
        res.json({
            massage : "fullname fields are requried"
        })
    }
    if(!email ){
        res.json({
            massage : "email fields are requried"
        })
    }

    // const exuser = await user.findById(req.user._id); he ahe bache ka kam


    //old email and fullname kadu 
    const olduser = await user.findById(req.user._id );

    //mentos zindhagi
    const exuser = await user.findByIdAndUpdate(req.user._id , {
        $set :{
            fullname,
            email
        }
    },
{
    new : true

}).select("-password")

res.json({
    massage : "update Account Detailes ....................",
    oldemail : olduser.email,
    exuser
})
.status(202)


}


const updateUserAvatar = async(req , res) => {

    //user kdun new file ghetli multer  chya help ne 
    //ani yekch avate ghenare so file use kel js more than one asel tr files kel ast
    const avtarlocalpathnew = req.file?.path;
    console.log("avatarloacal ptha : ",avtarlocalpathnew)
    if(!avtarlocalpathnew){
        res.json({
            massage :  "aavtar file is missing........."
        })
    }

    //file la cloudinary vr upload kru v url new update kru

    const newavatar = await uploadfileoncloudinary(avtarlocalpathnew);
    console.log("new avatar : " , newavatar)


    if(!newavatar){
        res.json({
            massage :  "aavtar file is uploading error........."
        })
    }

    //update in user account

    const exuer = await user.findOneAndUpdate(
        req.user._id ,
        {
            $set :{
                avatar : newavatar.url
            }
        },
        {
            new :true
        }
    ).select("-password")


    res.json({
        massage : "update avatar successfully..........",
        newavatar : newavatar.url
    })
    .status(200)




    




}

export {
    registeruser,
    logineduser,
    logoutuser,
    refrecaccesstoken,
    changePassword,
    currentuser,
    updateAccountDetails,
    updateUserAvatar

}