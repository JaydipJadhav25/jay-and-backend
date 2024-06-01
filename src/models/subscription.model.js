import mongoose ,{Schema, Types} from "mongoose";

const subsciptionschema = Schema({
    subcriber:{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    channel :{
        type : Schema.Types.ObjectId,
        ref : "User"
    }

},{ timestamps:true
})

export const Subsciption = mongoose.model("Subsciption" , subsciptionschema)