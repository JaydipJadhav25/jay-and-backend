import  Router  from "express";
import { logineduser, registeruser, logoutuser } from "../controllers/user.contollers.js";
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


export default router ;
// export {router}