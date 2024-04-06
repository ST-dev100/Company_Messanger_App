import mongoose from 'mongoose';


const employeeSchema = new mongoose.Schema({
  data: Buffer,
  // contentType: String,
  occupation:String,
  gender:String,
  email:String,
  userName:String,
  firstName:String,
  lastName:String,
  password:String
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee