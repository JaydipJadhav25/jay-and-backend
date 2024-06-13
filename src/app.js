// import { Express } from "Express";
import  express  from "express";

import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

//congiral this........

app.use(cors({
    origin :process.env.CORS_ORIGIN ,
    //origin access anywhere because set * all access
    Credential : true


}))

app.use(express.json({limit : "16kb"}))
// app.use(express.urlencoder({extended : true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// const port = 3000

// app.get('/', (req, res) => {
//     res.send(`<h1>jaydip dhananjay jadhav</h1>
//     <P>hellow wolde</P>`)
// //   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// ............................................................




// import router

import userRouter from "./routes/user.routes.js"


// impot tweet router

import tweetRouter from "./routes/tweet.routes.js"
// import video router
import videoroutet from "./routes/video.routes.js"

////////////////////////////////////////
app.use("/api/v1/user", userRouter)
app.use("/api/v1/tweets" , tweetRouter)
app.use("/api/v1/video" , videoroutet)



export {app} 