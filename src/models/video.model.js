import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoshema = new Schema(
    {
        videofile:{
            type :String,//cloudinary url 
            required : true
        },
        thumbanil:{
            type : String,
            required : true
        },
        title:{
            type : String,
            required : true
        },
        description: {
            type : String,
            required : true
        },
        duration: {
            type : Number,//cloudinary url
            required : true
        },
        views :{
            type : Number,
            default :0
        },
        ispublished : {
            type :Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }

    },
    {
        timestamps : true 
    }
)
mongoose.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("video" , videoshema)