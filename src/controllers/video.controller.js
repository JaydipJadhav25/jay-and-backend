import { video } from "../models/video.model.js"
import { uploadfileoncloudinary } from "../utils/cloudinary.js"



const getAllVideos = async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    
}

const publishAVideo =async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    console.log(title,  description)
    if(title === "") return res.json({massage :  "title is requried...."});

    //get video from multer local path

    // const videolocalpath = req.files?.videoFile;
    // const videolocalpath = req.files?.videoFile[0];
    const videolocalpath = req.files?.videoFile[0].path;

    const thumbnaillocalpath = req.files?.thumbnail[0].path;


    console.log("paths : " , videolocalpath , thumbnaillocalpath);

    if(!(videolocalpath && thumbnaillocalpath)) return res.json({massage :  "videofile amd thumbnail is requried...."});

    //upload on cloudinry

    const videoFile = await uploadfileoncloudinary(videolocalpath);
    const thumbanil = await uploadfileoncloudinary(thumbnaillocalpath);

    if(!(videoFile && thumbanil)) return res.json({massage :  "Fail To Files uploading ..."});

    console.log("data :" , videoFile.duration)
    console.log("data :" , videoFile.url)

    //stor in database
      //const videoFileurl =  videoFile.url;

    const uservideo = await video.create({
        videofile : videoFile.url, 
        thumbanil : thumbanil.url,
        title,
        description,
        // videofile: videoFileurl,
        duration: videoFile.duration,
        owner : req.user._id
    })

   return  res.json({
        massage : "publishAVideo successfully....",
        uservideo,
        videoFile,
        thumbanil

    })
    .status(202)

}







export { 
    publishAVideo
    
}