import  Router  from "express";
import { logineduser, registeruser, logoutuser , refrecaccesstoken, changePassword, currentuser, updateAccountDetails, updateUserAvatar, getUserChanelProfile, getWatchHistory} from "../controllers/user.contollers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyjwt } from "../middlewares/auth.middlewar.js";

const router = Router()

router.get("/" , (req , res) => {
    res.send(`<h1>this is  user router</h1>`)

})

// router.route("/register").post(registeruser)
// router.route("/register").post(() => {registeruser})
// router.post("/register" , () =>{
//     registeruser
// })


//user all


//user rgiester
router.route("/register").post(
    upload.fields(
        [{
            name : "avatar",
            maxCount :1
        },
        {
             name : "coverimage",
             maxCount : 1
        }]
    ),
    registeruser)


//login user   
 router.route("/login").post(logineduser)
 
 //logout user   
 router.route("/logout").post( verifyjwt , logoutuser)

//refresh - accesstoken
router.route("/refresh-accesstoken").post(verifyjwt, refrecaccesstoken)

//changing password
router.route("/changepassword").post(verifyjwt, changePassword)

//current user info
router.route("/currentuser").get(verifyjwt, currentuser)

// update Account details
router.route("/updateaccountdetails").post(verifyjwt, updateAccountDetails)

//update avatar 
//patch use kel karan aplyala all data updat kraycha nhi specific data update kraychay
//post methode all documeant update krto
//most iiiimmmmpppppp.......................
//apn user krun file ghenare so multer middleaer use kel ani yek file ghenare so single ani 
//jar more than one ghenare tr fields done.........
router.route("/avatar").patch(verifyjwt,upload.single("avatar") , updateUserAvatar)


//get user channel profile 
router.route("/c/:username").get(verifyjwt, getUserChanelProfile)

// watch history
router.route("/history").get(verifyjwt , getWatchHistory)

export default router ;
// export {router}