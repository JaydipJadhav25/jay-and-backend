// require('dotenv').config({path : "./env"})
// require('dotenv').config()
// import { Express } from "express";
// const app  = Express();
// import mongoose from "mongoose";
import dotenv from "dotenv"
import {conectdb} from "./db/index.js"
import {app} from "./app.js"
import path from "path"
dotenv.config({
    path : './.env'
})




// import conectdb from "./db/index.js";

// import { DB_NAME } from "../constants.js";
// import { Express } from "express";
// const app  = Express();

// let ACCESS_TOKEN_SECRET = jaydipdhananjayjadhavJADHAVJAYDIPDHANANJAY

// let REFRESH_TOKEN_SECRET =jayandbackend




conectdb()
.then(() => {
    app.listen( process.env.PORT || 8000 , () => {
        console.log(`server is running at 8000 port `)
        
    })
})
.catch((err) =>{
  console.log("database eror connection : " , err)
})


// (async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
       
//         app.on("error" , (error) =>  {
//             console.log("error : " , error)
//             throw error
//         })

//         app.listen(process.env.PORT , () => { 
//             console.log(`app listent on ${process.env.PORT} port`);
//         })



//     } catch (error) {
//         console.error("error data base : ", error)
//         throw error
        
//     }

// })()
 

//second approch 
// const conectdb = () =>  {

//     try {
//      const connectionistand = mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
//      console.log(`databasc connection sucessfully !! host ${connectionistand.connection.host}` )    
     

//     } catch (error) {
//         console.log("database connection error : " , error);
//         process.exit(1);
//     }
