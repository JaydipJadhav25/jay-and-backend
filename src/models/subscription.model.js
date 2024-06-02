import mongoose ,{Schema, Types} from "mongoose";

const subsciptionschema = Schema({
    subcriber:{
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    channel :{
        type : Schema.Types.ObjectId,
        ref : "user"
    }

},{ timestamps:true
})

export const Subsciption = mongoose.model("Subsciption" , subsciptionschema)