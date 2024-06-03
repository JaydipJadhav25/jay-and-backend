import  Router  from "express";

import { verifyjwt } from "../middlewares/auth.middlewar.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";


const router = Router();



router.use(verifyjwt); // Apply verifyJWT middleware to all routes in this


// router.get("/" , (req , res) => {
    //     res.send(`<h1>this is  user tweet </h1>`)
    
    // })
    
router.route("/").post(createTweet);

router.route("/user/:userId").get(getUserTweets);

router.route("/:tweetId").patch(updateTweet)


router.route("/:tweetId").delete(deleteTweet)





export default router