import mongoose from 'mongoose'
import project from './project'

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    status : { type: String,
        enum: ['todo', 'in-progress', 'done'],
        required: true,
        default: 'todo',
    },
    project:{type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true,

    },
    assignee:{type:mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    dueDate:{type: Date}
},{timestamps: true})

const Task = mongoose.model('Task', taskSchema);
export default Task;

