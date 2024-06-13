import { tweet } from "../models/tweet.model.js";
import mongoose from "mongoose";
import { user } from "../models/user.model.js";

const updateTweet = async (req, res) => {
    //TODO: update tweet
    const tweetId = req.params;


    const { newcontent } = req.body;


    console.log(" tweetId and newcontent : ", tweetId, newcontent);



    if (newcontent === "") {
        return res.json({
            massage: "content is required.."
        });
    }



    const usertweets = await tweet.find({
        owner: req.user._id
    });

    console.log("user tweets : ", usertweets);


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
    // const currenttweet = new mongoose.Types.ObjectId(tweetId);
    const isupdatetweet = await user.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
                // _id : req.user._id
            }
        },
        {
            $lookup: {
                from: "tweets",
                localField: "_id",
                foreignField: "owner",
                as: "usertweets"
            }
        },
        {
            $addFields: {
                usertweetcount: {
                    $size: "$usertweets"
                },
                ispresent: {
                    $cond: {
                        if: { $in: [new mongoose.Types.ObjectId(tweetId), "$usertweets._id"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                ispresent: 1,
                usertweetcount: 1,
                usertweets: 1
            }
        }
    ]);


    console.log("isupdatetweet result : ", isupdatetweet);
    console.log(" isupdatetweet result : ", isupdatetweet[0]);
    // console.log(" is present : " , isupdatetweet[1])
    console.log(" is present : ", isupdatetweet[0].ispresent);

    if (!(isupdatetweet[0].ispresent)) {
        return res.json({
            massage: "failed to update , tweet is not present ........"
        });
    }



    //present asel tr update kra 
    const updatedtweet = await tweet.findByIdAndUpdate(

        new mongoose.Types.ObjectId(tweetId),

        {
            content: newcontent
        }, {
        new: true
    }
    );

    return res.json({
        massage: "updataed tweet successfully.............",
        newcontent,
        // updatedtweet
    })
        .status(200);

};
