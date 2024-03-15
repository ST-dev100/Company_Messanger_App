import mongoose,{Schema} from 'mongoose';

const ReciverInfoSchema = new Schema({
    ReciverId:Schema.Types.ObjectId,
    SenderId:Schema.Types.ObjectId,
    RecivedTime:{
        type: Date,
        default: Date.now
      },
    MessageType:String,
    MessageId:{type:Schema.Types.ObjectId,ref:'GeneralMessage'}
})
const ReciverInfo  = mongoose.model('ReciverInfo', ReciverInfoSchema);
export default ReciverInfo
