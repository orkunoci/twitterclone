import mongoose,{models,model, Schema} from "mongoose";


const PostSchema = new Schema({
    author:{type:mongoose.Types.ObjectId,ref:'User'},
    likesCount:{type:Number,default:0},
    text:String,
    commentsCount:{type:Number,default:0},
    parent:{type:mongoose.ObjectId,ref:'Post'}
},{timestamps:true})


const Post = models?.Post || model('Post',PostSchema)
export default Post;