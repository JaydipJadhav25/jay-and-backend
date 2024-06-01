import { DBNAME } from "../constants.js"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config(
    {
        path : './env'

    }
)





 export async function conectdb(){

    console.log("!!!!!!!!!!!!!!!!!!!!!!database conection function !!!!!!!!!!!!")
    console.log(DBNAME)
    // console.log(process.env.PORT)
    try {
    //   await mongoose.connect(`${process.env.MONGODBURL}/${DBNAME}`)
    //conection db with atlres
    // await mongoose.connect("mongodb+srv://jaydipjadhav2512:jaydip2024@cluster0.x9hjord.mongodb.net/videotube")
    
    //conction db with mylocal system
    await mongoose.connect("mongodb://localhost:27017/videotube")
        console.log("databasc connected suceesfully .................")
        
    } catch (error) {
        console.log("error : " , error)
        process.exit(1);
    }
}
// export default conectdb