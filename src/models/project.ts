import mongoose from 'mongoose';
import { stringify } from 'node:querystring';
import Workspace from './workspace';

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    workspace: {type:mongoose.Schema.Types.ObjectId,
        ref : 'Workspace',
        required: true
    },

},{timestamps: true});

const Project = mongoose.model('Project', projectSchema);
export default Project;