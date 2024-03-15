import mongoose,{Schema} from 'mongoose';

const messageSchema = new Schema({
    Sender:Schema.Types.ObjectId,
    Reciver: Schema.Types.ObjectId,
    MessageType:String,
    TextMessage:String,
    PhotoMessage:Buffer,
    FileMessage:Buffer,
    FileName:String,
    FileSize:Number,
    PosteDate:{type:Date,default: Date.now}    
})
 const Messages = mongoose.model('Messages',messageSchema)
 export default Messages
// const TextContentSchema =  new Schema({
//     content:String,
//     generalMessageId:{type:Schema.Types.ObjectId,ref:'GeneralMessage'},
//     date:{
//         type: Date,
//         default: Date.now
//       }
// })

// const GeneralMessageSchema =  new Schema({
//     type:String,
//     random:String,
//     date:{
//         type: Date,
//         default: Date.now
//       }
// })

// const GeneralMessage = mongoose.model('GeneralMessage',GeneralMessageSchema)
// const TextContent = mongoose.model('TextContent',TextContentSchema)



// const PhotoMessageSchema =  new Schema({
//     content:Buffer,
//     generalMessageId:{type:Schema.Types.ObjectId,ref:'GeneralMessage'},
//     date:Date
// })

// const PhotoMessage = mongoose.model('PhotoMessage',PhotoMessageSchema)


