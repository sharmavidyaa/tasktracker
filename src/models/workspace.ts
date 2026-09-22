import mongoose from "mongoose";

const workSpaceSchema = new mongoose.Schema({
    name: {type : String, required: true},
    owner:{type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    },
    members :[{
        type: mongoose.Schema.Types.ObjectId,
        ref :'User',
    },],

},{timestamps: true});

const Workspace = mongoose.model('Workspace', workSpaceSchema);
export default Workspace;