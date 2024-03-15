import mongoose,{Schema} from 'mongoose';

const TextContentSchema =  new Schema({
    content:String,
    generalMessageId:{type:Schema.Types.ObjectId,ref:'GeneralMessage'},
    date:{
        type: Date,
        default: Date.now
      }
})

const GeneralMessageSchema =  new Schema({
    type:String,
    random:String,
    date:{
        type: Date,
        default: Date.now
      }
})

const GeneralMessage = mongoose.model('GeneralMessage',GeneralMessageSchema)
const TextContent = mongoose.model('TextContent',TextContentSchema)



const PhotoMessageSchema =  new Schema({
    content:Buffer,
    generalMessageId:{type:Schema.Types.ObjectId,ref:'GeneralMessage'},
    date:Date
})

const PhotoMessage = mongoose.model('PhotoMessage',PhotoMessageSchema)

export { GeneralMessage,PhotoMessage,TextContent}
