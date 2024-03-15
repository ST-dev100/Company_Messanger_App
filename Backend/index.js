import {gql,ApolloServer} from 'apollo-server-express';
// import streamToString from 'stream-to-string';
// const Upload = require('graphql-upload/Upload.mjs');   
import Upload from 'graphql-upload/Upload.mjs';  
import GraphQLUpload from 'graphql-upload/graphqlUploadExpress.mjs';    
import { GraphQLScalarType} from 'graphql'  
import http from 'http';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import express from 'express';
import bodyParser from 'body-parser'
import User from './models/User.js';
import Employee from './models/Employees.js';
import { GeneralMessage,PhotoMessage,TextContent} from './models/Message.js';
import ReciverInfo from './models/ReciverInfo.js';
import SenderInfo from './models/SenderInfo.js';
import fs from 'fs';
import { createWriteStream } from 'fs'; 
import Grid from 'gridfs-stream';  
import { resolve } from 'path';
import {Readable} from 'stream';
import jwt from 'jsonwebtoken';


const app = express();
app.use(GraphQLUpload())
// Increase payload size limit
const conn = mongoose.connection;
let gfs;

mongoose.connect('mongodb://127.0.0.1:27017/Messanger')
  .then(() => {
    console.log('Connected to MongoDB');    

  })
  .catch((err) => {
    console.error(err);   
  });
                  
  
  conn.once('open', () => {
    
    // Grid.mongo = mongoose.mongo;
    console.log("opened")  
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads'
    });


  });
  conn.on('error', console.error.bind(console, 'connection error:'));
  const Files = mongoose.model('Files', {
  filename: String,
  size: Number,
  uploadDate: Date
});


//LOp8XntGQusvVtgI jZBxia72OUR4iShk Ptpcpiwb74KOBcux KuZhQyL8vyN8crPW
//nINpdU95T5gt8xCS
//mongodb+srv://simalike245:nINpdU95T5gt8xCS@cluster0.vvqnux6.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://simalike245:nINpdU95T5gt8xCS@cluster0.vvqnux6.mongodb.net/
const books = [
    {
    name:'Alemu', 
    author:'Shewa'
   },
   {
    name:'Girma', 
    author:'gezaw'
  },
  {
    name:'Alu',
    author:'Shwan'
  },
]

const typeDefs = gql`
scalar Readable 
scalar Upload
type User {
    _id: ID!
    userName: String!
    password: String!
  }
type Employee{
    _id:ID
    firstName:String
    lastName:String
    email:String
    occuption:String
    data:String
}  
type Book{
    name: String
    author: String
}
type Emp{
  userName:String
  dataa:String
  id:ID
}
type IndivdualEmp{
  userName:String
  occupation:String
  data:String
  id:ID
}
type Query{
    books:[Book]
    employees:[Emp] 
    employee:IndivdualEmp
    getUserById(id: ID!): Emp  
    getFiles:String
    getMessage(senderId:ID,reciverId:ID):String
}
type Mutation{
    addUser(name:String!,author:String!):ID!,
    createUser(userName: String!, password: String!): User!,
    createEmployee(firstName:String,lastName:String,email:String,occuption:String):ID
    uploadPhoto(file: Upload!): String
    uploadVideo(file2: Upload!): String   
    loginUser(username:String,password:String):String
    sendMessage(type:String,text: String!,senderId:ID,reciverId:ID): String
    
} 

`
const getGridFS = () => { 
  if (!gfs) {
    throw new Error('GridFS is not initialized. Call connectDB() first.');
  }

  return gfs; 
};   
// const FileSchema = new mongoose.Schema({
//   filename: String,
//   contentType: String,
//   metadata: Object
// });
// const File = mongoose.model('File', FileSchema);

const resolvers = {
    Query:{ 
        books(_,args,context){
            // console.log(context)
            return books
        },
        employees:async(_,args,context)=>
        {
          const emp =await Employee.find({},'userName data _id');
          const newEmp = emp.map(e=>{
              //  console.log(e.data.toString('base64')) 
               const base64data = e.data.toString('base64')
              //  console.log(base64data)
               return {userName:e.userName,dataa:base64data,id:e._id}     
          }) 
          return newEmp
        },
        employee:async(_,args,{req,res})=>{
          if(req.headers.authorization)
          {
            console.log(true)
            const token = req.headers.authorization.split(" ")[1]
            console.log(token)
            const data = await jwt.verify(token,'PRIVATE')
            
              if(data){
                console.log("correct")
                const tk =await jwt.decode(token, "PRIVATE")
                const doc =await Employee.findById(tk.id)
               const base64data = doc.data.toString('base64')
                // console.log(doc)
                const {userName,occupation,_id} = doc
                return {userName,occupation,id:_id,data:base64data}
              }
              else{
                return null
              }
            
          }
          else
          {
            return null
          }
        },
        getUserById: async (_, { id }) => {
            const user = await Employee.findById(id);
            const base64data = user.data.toString('base64')
            // console.log(base64data)
            return {userName:user.userName,dataa:base64data,id:user._id} 
        },
        getFiles:async()=>{
          const file = await Files.findOne({ filename:"simon.jpg" });  
          
          if (!file) {
            throw new Error('File not found');
          }
          const writableStream = fs.createWriteStream(file.filename);
          const downloadStream =await gfs.openDownloadStreamByName(file.filename);
        //  downloadStream.on('data',(chunk)=>{
            
        //     console.log(chunk)
        //   })

         downloadStream.pipe(writableStream);
        //  const readST = fs.createReadStream('downloaded_example.jpg')
        // fs.createReadStream('downloaded_example.jpg').on('data',(chunk)=>{
        //     console.log("start",chunk)
        // })

        const ReadableStream = fs.createReadStream(file.filename);
      //  downloadStream.on('data',(chunk)=>{
      //     buf = chunk.toString('base64')
      //     return buf
      //   })
      //   downloadStream.on('end',()=>{
      //     console.log('end')
      //   })
        let buff = fs.readFileSync(file.filename)
        const x = Buffer.from(buff).toString('base64')
          return x
        
        },
        getMessage:async(parent, {senderId,reciverId })=>{
          console.log("yes you got it",senderId,reciverId)
          const senderInfo = await SenderInfo.find({SenderId:senderId,ReciverId:reciverId}).populate('MessageId')
          const reciverInfo =  await ReciverInfo.find({SenderId:reciverId,ReciverId:senderId}).populate('MessageId')
          // console.log(senderInfo.concat(reciverInfo))
          // const t = await TextContent.find({generalMessageId:'65f321a2ce53278d7ec8ed39'})
          // console.log(t[0])
          const allMessage = []
          await senderInfo.concat(reciverInfo).forEach( async(msg)=>{
            const text =await TextContent.find({generalMessageId:msg.MessageId._id})
            allMessage.push(text[0])
          })
              console.log(allMessage)
           
           return "hi"
        }
    },
    Mutation:{
        addUser(parent,{name,author}){ 
            const id = books.length
            console.log(parent)
            books.push({name,author})
            return id
        },
        createUser:async(parent,{userName,password})=>{
            const salt =await bcrypt.genSalt(10);
            const hash =await bcrypt.hash(password, salt);
            console.log(parent)
            const user = new User({ userName, password:hash});
            await user.save();  
            return {userName,password:hash}
        },
        createEmployee:async(parent,args)=>{
            fs.readFile('./images/efi.jpg', async(err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                const salt =await bcrypt.genSalt(10); 
                const hash =await bcrypt.hash("simon", salt);

                const employee = new Employee({   
                
                  data: data,
                  // contentType: 'image/jpeg',
                  occupation:'Owner',
                  email:"simontamene.dev@gmail.com",
                  userName:'simon',
                  firstName:"simon",
                  lastName:"tamene",
                  password:hash
                });
                         
                await employee.save(); 
              });
           return 1222
        },
        uploadPhoto: async (_, { file }) => {   
          const  filee = await file;
          const {createReadStream,filename,mimetype} = filee.file
          const stream = createReadStream();
          const writable = fs.createWriteStream(filename)
          stream.pipe(writable)
         let bufferr = Buffer.alloc(0)
         stream.on('data',chunk=>{
          bufferr = Buffer.concat([bufferr,chunk])
         })
         stream.on('end',async()=>{
          const salt =await bcrypt.genSalt(10);
          const hash =await bcrypt.hash("abc", salt);
          const buffer = fs.readFileSync('simon.jpg')
          const employee = new Employee({  
          
            data: bufferr,
            occupation:'Owner',
            email:"simontamene.dev@gmail.com",
            userName:'simon',
            firstName:"simon",
            lastName:"tamene",
            password:hash   
          });
          await employee.save();
         })
          // await Employee.deleteMany() 
      // const buffer = Buffer.from(file, 'base64');

      // console.log(buffer);
  

      // fs.writeFileSync('last.jpg', buffer, 'binary');  

          return "jjj";    
        },
        uploadVideo:async(_, { file2 })=> {
  
          const { file} = await file2;
          const {createReadStream,filename,mimetype} = file
          const uploadStream = gfs.openUploadStream(filename, { contentType: mimetype });
          const stream = createReadStream();
          const path = `./uploads/${filename}`;
          const result = await new Promise((resolve, reject) => {
            stream.pipe(uploadStream)
              .on('finish', async () => {
                await Files.create({
                  filename: filename,
                  size: uploadStream.bytesWritten,
                  uploadDate: new Date() 
                });
                resolve(true);
              })
              .on('error', (error) => {
                reject(error);
              });
          });                
          // const wrs = getGridFS().createWriteStream({_id:new mongoose.Types.ObjectId(),
          // filename, contentType: mimetype,
          // metadata: { description: 'This can be any file' }});
          // stream.pipe(wrs)         
          // wrs.on('close', (file) => {
          //   console.log('File uploaded successfully:', file.filename);  
          // });
          return 'File uploaded successfully!';
        },
        loginUser:async(_,args,context,info)=>
        {
            // console.log(args)
            let userName =await Employee.find({userName:args.username})     
            // console.log(info);
                // console.log(context.req.headers.authorization)
            if(userName.length)
            {
              let x = await bcrypt.compare(args.password,userName[0].password);
              if(x)
              {
                const token = jwt.sign({ id:userName[0]._id}, 'PRIVATE');
              context.res.cookie("token",token);
                return token
              }
              else
              {
                console.log("UserName is correct but the password is incorrect")
              }
            }
            else{
              console.log("Email doesn't exist")   
              }
        },
        sendMessage: async(parent, { type ,text,reciverId,senderId }) => {
              if(type==="Text"){
              const random = Math.random().toString(36).slice(2,15)
              const generalMessage = new GeneralMessage({
                type,
                random
              })
              await generalMessage.save()
            const gen = await GeneralMessage.findOne({random:random})
            
              const textContent = new TextContent({
                content:text,
                generalMessageId:gen._id
              })
              await textContent.save()
              const senderInfo = new SenderInfo({ SenderId:senderId,
                ReciverId:reciverId,
                MessageType:type,
                MessageId:gen._id
              });      
              const reciverInfo = new ReciverInfo({
                
                ReciverId:reciverId,
                SenderId:senderId,
                MessageType:type,
                MessageId:gen._id
              }); 
              await senderInfo.save();
              await reciverInfo.save();
          // console.log(reciverId,' ',senderId)
                    return `TextMessage sent: ${text}`;
                  }
                  return `PhotoMessage sent`;

      }   
    },  
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req,res }) => ({ req,res }),
})

async function startApolloServer()
{
  await server.start();
  server.applyMiddleware({app})
  app.listen({port:4000},()=>console.log(`Server is running on port ${server.graphqlPath}`))        
}

startApolloServer().catch((error)=>{
  console.log(error)  
})   




// server.listen().then(({url})=>{      
//     console.log(`Server is running on port ${url}`) 
// })        