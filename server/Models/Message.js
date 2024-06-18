import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
    text: {
         type: String,
         default: ""
    },
    imageUrl:{
        type: String,
        default: ""
    },
    videoUrl:{
        type: String,
        default: ""
    },
    seen:{
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)


const Message = mongoose.model("Message", MessageSchema);
export default Message