import mongoose,{Schema} from 'mongoose';

const SenderInfoSchema = new Schema({
    SenderId:Schema.Types.ObjectId,
    ReciverId:Schema.Types.ObjectId,
    SentTime:{
        type: Date,
        default: Date.now
      },
    MessageType:String,
    MessageId:{type:Schema.Types.ObjectId,ref:'GeneralMessage'}
})
const SenderInfo  = mongoose.model('SenderInfo', SenderInfoSchema);
export default SenderInfo
