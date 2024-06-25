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

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    console.log("videoId : " , videoId)
    if(videoId === "") return res.json({massage : "video Id Requried."})

     const uservideo = await video.findById(videoId);

     if(!uservideo) return res.json({massage : " Something went wrong get video .."})


   return res.json({
        massage : "getVideo successfully......",
        uservideo
    })
    .status(200)

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    console.log("videoId : " , videoId)
    if(videoId === "") return res.json({massage : "video Id Requried."})

   const uservideo =  await video.findByIdAndDelete({_id : videoId})

   if(!uservideo) return res.json({massage : " Something went wrong deleting user video.."})

    return res.json({
        massage : "Video deleted successfully......",
      
    })
    .status(200)
})



const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details tlelike ti, description, thumbnail
    const { title , description } = req.body;

    console.log("videoId : " , videoId)

    if(!videoId) return res.json({massage : "video Id Required."})

    console.log("user data : " , title , description);

    if (
        [title , description].some((field) => field?.trim() === "")
    ) {
        return res.json({massage :  "All fields are required"})
        .status(400)
    }

    //access thumnail from multer

    const thumbanillocalpath = File.thumbanil.url
    console.log("local path : " , thumbanillocalpath);


    if (!thumbanillocalpath) {
        return res.json({massage : "thumbanil  file is required"})
        .status(400);

    }

    // upload 

    const thumbanil = await uploadfileoncloudinary(thumbanillocalpath);

    if (!thumbanil) {
        return res.json({massage : "Error while uploading  thumnail on cloudinary "})
        .status(400);

    }

 
    const updatevideo = await video.findByIdAndUpdate(videoId,{
        $set :{
            title,
            description,
            thumbanil : thumbanil.url
        }
    },
{
    new : true
})

if (!updatevideo) {
   return res.json({ massage : "Something went wrong while update video details"})
}


 return res.json({
    massage : "successfully update video details .. ",
    updatevideo
 })
 .status(202)


})









export { 
    publishAVideo,
    getVideoById ,
    deleteVideo,
    updateVideo
    
}