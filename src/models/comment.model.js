import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentschems = new Schema(
    {
        content : {
            type : String,
            required : true
        },
        video : {
            type : Schema.Types.ObjectId,
            ref : "video"
        },
        owner: {
            type : Schema.Types.ObjectId,
            ref : "user"
        }

},
{
    timestamps : true 
})



commentschems.plugin(mongooseAggregatePaginate)

export const comment = mongoose.model("comment" ,commentschems)