import {tweet} from "../models/tweet.model.js"
import mongoose  from "mongoose"
import {user}  from "../models/user.model.js"





const createTweet = async(req, res) =>{

    // const content = req.body
    const {content} = req.body

    console.log("user content : " ,content );

    if(content ==="") {
        res.json({
            massage : "content is requried........"
        })
    }

    const user =  req.user._id

    const tweetinfo = await tweet.create({
        content,
        owner : user

    })

console.log( " tweet  result : ", tweetinfo )

  
    

    res.json({
        massage : "creted a tweet successfully..........",
        tweetinfo,
       
        
       
    })


}

const getUserTweets = async (req, res) => {
    // get user tweets
    const{userId} = req.params;

    console.log("userId :" , userId);

    const currentuserId = req.user._id;
    console.log("currentuserId :" , currentuserId);


    if(userId != currentuserId){
        res.json({
            massage  :"userid is wrong / invalide ......"
        })
    }

    //get user tweet in tweet model



              //this is wrong pn kaaaa..............
              //tyach model mde mi join krtoy...as asel vatty
    // const usertweetsresult = await tweet.aggregate([
    //     {
    //         $match :{
    //         _id : new mongoose.Types.ObjectId(req.user._id)
          
    //         }
    //     },
    //     {
    //                     $lookup :{
    //             from :"tweets",
    //             localField :"_id",
    //             foreignField :"owner",
    //             as :"usertweets"
    //         }
    //     },{
    //         $addFields :{
    //             usertweetcount : {
    //                 $size :"$usertweets"
    //             }
    //         }
    //     },{
    //         $project :{
    //             usertweetcount : 1,
    //             usertweets : 1,
    //         }
    //     }
    // ])

    //case 1 : using aggtrgate piplines...
    // const usertweetsresult = await user.aggregate([
    //   {
    //     $match :{
    //         _id : new mongoose.Types.ObjectId(req.user._id)

    //     }
    //   },
    //   {
    //     $lookup :{
    //                     from :"tweets",
    //                     localField :"_id",
    //                     foreignField :"owner",
    //                     as :"usertweets"
    //     }

    //   },
    //   {
    //             $addFields :{
    //                 usertweetcount : {
    //                     $size :"$usertweets"
    //                 }
    //             }
    //         },
    //         {
    //             $project :{
    //                 usertweetcount : 1,
    //                 usertweets : 1,
    //             }
    //         }
    // ])

//case 2 : using find method

const usertweets =  await tweet.find({
    owner : userId
})

    // console.log("result: " , usertweetsresult)
    console.log("result: " , usertweets)

res.json({
    massage : "get all user tweet fetched successfully...........",
    total : usertweets.length,
 usertweets,
 

})

    
}


const updateTweet = async (req, res) => {
    //TODO: update tweet
    const { tweetid } = req.params;

   //vvvimp...........
   //1.tweeetId user kel tr ani new mongoose.type.ObjectId crete krayla laglo pn error ani
    //   E:\jay and back\node_modules\bson\lib\bson.cjs:2147
    //    throw new BSONError('input must be a 24 character hex string, 12 byte Uint8Array, or an integer');
       //  ani sadhi value shwo krt hot 

    ///2. pn tweetid kiva other user kelya vr 
    //project id crete zala v
    // pn  console   console.log(" tweetId  : " , tweetid ) kelya vr undefind ala

    //kaa....
    


    const {newcontent}= req.body;
    
 console.log("tweet is : " , new mongoose.Types.ObjectId(tweetid)); 
 if(newcontent ===""){
        return res.json({
            massage : "content is required.."
        })
    }

   

    // const usertweets = await tweet.find({
    //     owner : req.user._id
    // })




    // if(!usertweets){
    //     return res.json({
    //         massage : "tweets is empty"
    //     })
    // }


    // const updatedtweet = await tweet.findByIdAndUpdate(
    //     //as tr kon pn tweet id takun konche pn tweet update krtil
    //     tweetId 
    //     ,
    //     {
    //         content : newcontent
    //     }
    // )
   


//user aggregate pipelines............
//user find krun tyane all tweer access kru
//using in opretor tweet id chi ahe ti chya tweet mdhil ahe ka te check kru
// if tweet id is present so changing allowed 
//otherwise no changed .........
//returen responers


const isupdatetweet = await user.aggregate([
    {
        $match :{
            _id : new mongoose.Types.ObjectId(req.user._id)
            // _id : req.user._id
        }
    },
    {
                   $lookup :{
                                from :"tweets",
                                localField :"_id",
                                foreignField :"owner",
                                as :"usertweets"
                       }
    },
    {
        $addFields :{

            usertweetcount : {
                $size : "$usertweets"
            },
           ispresent :{
                    $cond :{
                        if :{$in :[new mongoose.Types.ObjectId( tweetid ), "$usertweets._id"]},
                        then :true,
                        else :false
                        }

            
                   }    
    }

},
{
    $project : {
        ispresent: 1,
        usertweetcount : 1,
        usertweets : 1
    }
}
])


console.log("isupdatetweet result : " , isupdatetweet)
console.log(" isupdatetweet result : " , isupdatetweet[0])
// console.log(" is present : " , isupdatetweet[1])
console.log(" is present : " , isupdatetweet[0].ispresent)

if(!(isupdatetweet[0].ispresent)){
    return  res.json({
        massage : "failed to update , tweet is not present ........"
    })
}

//present asel tr update kra 


const updatedtweet = await tweet.findByIdAndUpdate(
      
    new mongoose.Types.ObjectId( tweetid)
        ,
        {
            content : newcontent
        },{
            new : true
        }
    )

   return res.json({
        massage :"updataed tweet successfully.............",
        newcontent , 
        // updatedtweet
    })
    .status(200)

}



const deleteTweet = async (req, res) => {
    //TODO: delete tweet
const { tweetId } = req.params;

 console.log("tweet id : ",  new mongoose.Types.ObjectId(tweetId));

 //current user a tyche all tweet find krun tyachi given tweet delet kru

 const usertweer = await user.aggregate([
    {
        $match :{
            _id : new mongoose.Types.ObjectId(req.user._id)
        }
    },{
        $lookup :{
            from : "tweets",
            localField :"_id",
            foreignField :"owner",
            as : "userAllTweets"
        }
    },{
        $addFields :{
            usertweetscount : {
                $size : "$userAllTweets"
            },
            istweetpresent :{
                $cond :{
                    if :{$in :[ new mongoose.Types.ObjectId(tweetId),"$userAllTweets._id" ]},
                    then :true,
                    else :false
                    }
            }
        }
    },{
        $project :{
            usertweetcount : 1 ,
            istweetpresent :1
        }
    }
 ])

 console.log("result : " , usertweer)
 console.log(" istweetpresent : " , usertweer[0].istweetpresent)

 if(!(usertweer[0].istweetpresent)){
    return  res.json({
        massage : "failed to delete ,this tweet is not present ........"
    })
 }

 const deletetweet = await tweet.deleteOne(
    new mongoose.Types.ObjectId(tweetId)
 )
 console.log(" deleted tweet : " , deleteTweet)

 
 if(!(deleteTweet)){
    return  res.json({
        massage : "The server does not support the functionality required to fulfill the request."
    })
 }

 


 return res.json({
    massage : "tweet is deleted successfully............."
 })
 .status(202)

}


export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}