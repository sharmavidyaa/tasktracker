import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose'
import express, { Request, Response, NextFunction } from 'express';
import { configDotenv } from 'dotenv';


import workspaceRoutes from './routes/workspaceRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import dns from 'node:dns';

// Force Node to use IPv4 first and query Google's public DNS servers
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);


dotenv.config();

console.log(`Port is : ${process.env.PORT}`)
const app = express();

async function ConnectDB(){
  try{
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    const success = await mongoose.connect(mongoUri);
    if(success) console.log("Connected to MongoDB successfully");

  }catch(error){
    console.log("Failed to connect to MongoDB:", error);
    throw error;
  }
}

function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.log(`the method is : ${req.method} and the url is : ${req.url}`);
  next();
}

app.use(requestLogger);
app.use(express.json());

// Creates a project inside a workspace
// Project item routes
app.use("/projects", projectRoutes);

// Project collection routes nested under a workspace
app.use("/workspaces/:workspaceID/projects", projectRoutes);

// Task collection and item routes nested under a project
app.use("/projects/:projectID/tasks", taskRoutes);

//Workspace
app.use("/workspaces",workspaceRoutes);

async function serverStart(){
  try{
    await ConnectDB();
    app.listen(3000, ()=> {
        console.log("The server is live on port 3000");
    });

  }catch(error){
    console.log("Wasnt in the mood to connect!!", error);
    process.exit(1);
  }
}

serverStart();
