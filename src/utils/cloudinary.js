import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

          
// cloudinary.config({ 
//   cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key:process.env.CLOUDINARY_API_KEY , 
//   api_secret:process.env.CLOUDINARY_API_SECRET  
// });

cloudinary.config({ 
    cloud_name: 'mudemoenv', 
    api_key: '216618791292249', 
    api_secret: 'P4Nk7c481vzAZkdehLgPY2huZvc' 
  });
     
   

const uploadfileoncloudinary = async (localfilepath) => {

    try {

        if(!localfilepath) {
            console.log("path is not consites ..")
            return null
        }

        //upload on cloudinary
        const respone = await cloudinary.uploader.upload(localfilepath ,
            {
                resource_type :"auto"
            })
            //file has been uploaded successfull

            console.log("file is uploaded on cloudinary", respone.url)
            return respone;

        
    } catch (error) {

        fs.unlinkSync(localfilepath) //remove the locally saved file as the upload operation got failed

        return null
        
    }

}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


export {uploadfileoncloudinary}

