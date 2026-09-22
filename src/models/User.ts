import { Timestamp } from 'mongodb';
import mongoose, { models } from 'mongoose';

const userSchema =  new mongoose.Schema({
    name: {type : String, required: true},
    email: {type: String, required:true, lowercase: true, unique: true},
    password:{type : String, required: true},
    },{timestamps : true}
);
const User = mongoose.model('User', userSchema);

export default User;