import mongoose,{models,model, Schema} from "mongoose";


const PostSchema = new Schema({
    author:{type:mongoose.Types.ObjectId,ref:'User'},
    text:String,
})


const Post = models?.Post || model('Post',PostSchema)
export default Post;