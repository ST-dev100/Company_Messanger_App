import {gql,ApolloServer} from 'apollo-server-express';
// import {PubSub} from 'apollo-server'
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
import Messages from './models/Message.js';
import ReciverInfo from './models/ReciverInfo.js';
import SenderInfo from './models/SenderInfo.js';
import fs from 'fs';
import { createWriteStream } from 'fs'; 
import Grid from 'gridfs-stream';  
import { resolve } from 'path';
import {Readable} from 'stream';
import jwt from 'jsonwebtoken';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {createServer} from 'http';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from '@graphql-tools/schema';
const pubsub = new PubSub();


const app = express();
app.use(GraphQLUpload())
// Increase payload size limit
const conn = mongoose.connection;
let gfs;
let gfs2;

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

    gfs2 = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'messageFiles'
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
scalar Date
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
type Message{
  _id:ID
  Sender:ID
  Reciver:ID
  MessageType:String
  TextMessage:String
  PhotoMessage:String,
  FileMessage:String,
  FileName:String,
  FileSize:Float,
  Base64DataFile:String,
  PosteDate:Date
}
type mssg{
  strings:[String]
}
type Query{
    books:[Book]
    employees:[Emp] 
    employee:IndivdualEmp
    getUserById(id: ID!): Emp  
    getFiles:String
    getMessage(senderId:ID,reciverId:ID):[Message]
}

type Subscription {
  messageAdded:Message
}
type Mutation{
    addUser(name:String!,author:String!):ID!,
    createUser(userName: String!, password: String!): User!,
    createEmployee(firstName:String,lastName:String,email:String,occuption:String):ID
    uploadPhoto(file: Upload!): String
    uploadVideo(file2: Upload!): String   
    loginUser(username:String,password:String):String
    sendMessage(type:String,text: String,senderId:ID,reciverId:ID,messageFile:Upload): Message 
    deleteMessage(messageId: [ID]!): mssg
}  

`
const getGridFS = () => { 
  if (!gfs) {
    throw new Error('GridFS is not initialized. Call connectDB() first.');
  }

  return gfs; 
};
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn)
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
         downloadStream.pipe(writableStream);
        const ReadableStream = fs.createReadStream(file.filename);
        let buff = fs.readFileSync(file.filename)
        const x = Buffer.from(buff).toString('base64')
          return x
        
        },
        getMessage:async(parent, {senderId,reciverId })=>{
          const SenderInfo =  await Messages.find({Sender:senderId,Reciver:reciverId})
          const ReciverInfo =  await Messages.find({Sender:reciverId,Reciver:senderId})
          const Messagelist = SenderInfo.concat(ReciverInfo);
          Messagelist.sort((a, b) => new Date(a.PosteDate) - new Date(b.PosteDate));
          let fileData = 'hh';
          for (const message of Messagelist) {
            if (message.FileName) {
                const fileStream = gfs2.openDownloadStreamByName(message.FileName);
                let fileData = '';
                
                await new Promise((resolve, reject) => {
                    fileStream.on('data', chunk => {
                        fileData += chunk.toString('base64');
                    });
    
                    fileStream.on('end', () => {
                        message.FileName = fileData;
                        resolve();
                    });
    
                    fileStream.on('error', err => {
                        console.log(`Error streaming file: ${err}`);
                        reject(err);
                    });
                });
            }
        }
    
        // console.log("after Sorted", Messagelist) 
        console.log("after Sorted", Messagelist) 
    
        return Messagelist;
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
          return 'File uploaded successfully!';
        },
        loginUser:async(_,args,context,info)=>
        {
            let userName =await Employee.find({userName:args.username})   
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
        sendMessage: async(parent, { type ,text,reciverId,senderId,messageFile }) => {
              if(type==="Text"){
                const messages = new Messages({
                  Sender:senderId,
                  Reciver:reciverId,
                  MessageType:type,
                  TextMessage:text
                })
                await messages.save();
                const SenderInfo =  await Messages.find({Sender:senderId,Reciver:reciverId})
                const ReciverInfo =  await Messages.find({Sender:reciverId,Reciver:senderId})
                const Messagelist = SenderInfo.concat(ReciverInfo);
                pubsub.publish('MESSAGE_ADDED', { messageAdded: messages });
                // pubsub.publish('MESSAGE_ADDED', { messageAdded: messages });
                console.log(messages)
                    return messages;
                  }
                  else if(type === "Pic")
                  {
                    const { file} = await messageFile;
                    const {createReadStream,filename,mimetype} = file
                    console.log(file)
                    const uploadStream = gfs2.openUploadStream(filename, { contentType: mimetype });
                    const stream = createReadStream();
                    let msg = null;
                    const result = await new Promise((resolve, reject) => {
                      stream.pipe(uploadStream)
                        .on('finish', async () => {
                          msg =  await Messages.create({
                            Sender:senderId,
                            Reciver:reciverId,
                            MessageType:type,
                            FileName: filename,
                            FileSize: uploadStream.bytesWritten,
                          });
                          resolve(true);
                        })
                        .on('error', (error) => {
                          reject(error);
                        });
                    }); 
                    const fileStream = gfs2.openDownloadStreamByName(filename);
                    let fileData = '';
                    
                    await new Promise((resolve, reject) => {
                        fileStream.on('data', chunk => {
                            fileData += chunk.toString('base64');
                        });
        
                        fileStream.on('end', () => {
                            msg.FileName = fileData;
                            resolve();
                        });
        
                        fileStream.on('error', err => {
                            console.log(`Error streaming file: ${err}`);
                            reject(err);
                        });
                    });
                pubsub.publish('MESSAGE_ADDED', { messageAdded: msg });

                    return msg
                  }
                  else if(type === "Video")
                  {
                    const { file} = await messageFile;
                    const {createReadStream,filename,mimetype} = file
                    console.log(file)
                    const uploadStream = gfs2.openUploadStream(filename, { contentType: mimetype });
                    const stream = createReadStream();
                    let msg = null;
                    const result = await new Promise((resolve, reject) => {
                      stream.pipe(uploadStream)
                        .on('finish', async () => {
                          msg =  await Messages.create({
                            Sender:senderId,
                            Reciver:reciverId,
                            MessageType:type,
                            FileName: filename,
                            FileSize: uploadStream.bytesWritten,
                          });
                          resolve(true);
                        })
                        .on('error', (error) => {
                          reject(error);
                        });
                    }); 
                    const fileStream = gfs2.openDownloadStreamByName(filename);
                    let fileData = '';
                    
                    await new Promise((resolve, reject) => {
                        fileStream.on('data', chunk => {
                            fileData += chunk.toString('base64');
                        });
        
                        fileStream.on('end', () => {
                            msg.FileName = fileData;
                            resolve();
                        });
        
                        fileStream.on('error', err => {
                            console.log(`Error streaming file: ${err}`);
                            reject(err);
                        });
                    });
                pubsub.publish('MESSAGE_ADDED', { messageAdded: msg });

                    return msg 
                  }
                  return null;

      },
      deleteMessage: (parent,{messageId})=>{
        console.log("message id is",messageId)
        messageId.map(async(x)=>{
         const message =await Messages.findById(x)
         if(message.FileName)
         {
          await Messages.deleteOne({ _id: x });
          const fileId = await gfs2.find({ filename: message.FileName }).toArray();
          if (fileId.length > 0) {
            await gfs2.delete(fileId[0]._id);
            console.log('File successfully deleted from GridFS');
          } else {
            console.log('File not found in GridFS');
          }
         }
         else
         {
          await Messages.deleteOne({ _id: x });
          console.log("Text Deleted")
         }
        })
        return {strings:messageId}
      },  
    },  
    Subscription: {    
      messageAdded: {
        subscribe: () => pubsub.asyncIterator('MESSAGE_ADDED')
      }
    },
}
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
    schema,
    context: ({ req,res }) => ({ req,res,pubsub }), 
})

async function startApolloServer()
{
  await server.start();
  server.applyMiddleware({app})
  const httpServer = createServer(app);
  // app.listen({port:4000},()=>console.log(`Server is running on port ${server.graphqlPath}`))
  httpServer.listen({ port: 4000 }, () => {
    console.log(`Server is running on port ${server.graphqlPath}`);
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams, webSocket, context) => {
        console.log("Client connected");
      }}, {
      server: httpServer,
      path: '/graphql',
    });
  });        
}

startApolloServer().catch((error)=>{
  console.log(error)  
})   




// server.listen().then(({url})=>{      
//     console.log(`Server is running on port ${url}`) 
// })        