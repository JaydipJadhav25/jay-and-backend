import mongoose ,{Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const likeSchema = new Schema(
    {
        comment :{
            type : Schema.Types.ObjectId,
            ref :"comment"
        },
        video :{
            type : Schema.Types.ObjectId,
            ref :"video"
        },
        likeby :{
            type : Schema.Types.ObjectId,
            ref :"user"
        },
        tweet :{
            type : Schema.Types.ObjectId,
            ref :"tweet"
        },
        

    },
    {
        timestamps : true 
    }
)


// likeSchema.plugin(mongooseAggregatePaginate)

export const like = mongoose.model("like" ,likeSchema)