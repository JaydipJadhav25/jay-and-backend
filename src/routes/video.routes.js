import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { publishAVideo } from "../controllers/video.controller.js";
import { verifyjwt } from "../middlewares/auth.middlewar.js";

const router = Router();
router.use(verifyjwt)


router.get("/" , (req, res) =>{
    return res.json({
        massage : " this is video Route "
    })
})

router.route("/").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
        
    ]),
    publishAVideo
)



export default router