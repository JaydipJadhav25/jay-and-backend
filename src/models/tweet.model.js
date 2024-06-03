import mongoose ,{Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tweetSchema = new Schema(
    {
       content : {
    type: String,
    required: true,
    lowecase : true,
    trim : true , 
    index : true

   },
   owner :{
    type : Schema.Types.ObjectId,
    ref : "user"
    },

    },
    {
        timestamps : true 
    }
)

// mongoose.plugin(mongooseAggregatePaginate)

export const tweet = mongoose.model("tweet" , tweetSchema)
