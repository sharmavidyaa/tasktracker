import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express';

dotenv.config();
console.log(process.env.PORT);

const app = express();

// function requestLogger(req: Request, res: Response, next: NextFunction) {
//   console.log(`the method is : ${req.method} and the url is : ${req.url}`);


app.use((req, res, next)=>{
    console.log(`the method is : ${req.method} and the url is : ${req.url}`);
    next();
})


app.get('/', (req, res) => {
    res.json({ message : "Task Tracker API Running"});
});

function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.log(`the method is : ${req.method} and the url is : ${req.url}`);
  next();
}

app.use(requestLogger);


// APIs for: Workspaces, Projects, and Tasks

// Lists all workspaces available to the current user
app.get("/workspaces", (req, res) => {
  // Lists workspaces
});

// Reads a single workspace by its ID
app.get("/workspaces/:workspaceID", (req, res) => {
  // Reads a workspace
});

// Creates a new workspace
app.post("/workspaces", (req, res) => {
  // Creates a workspace
});

// Updates part of an existing workspace
app.patch("/workspaces/:workspaceID", (req, res) => {
  // Updates a workspace
});

// Deletes a workspace by its ID
app.delete("/workspaces/:workspaceID", (req, res) => {
  // Deletes a workspace
});

// Lists all projects belonging to a workspace
app.get("/workspaces/:workspaceID/projects", (req, res) => {
  // Lists projects in a workspace
});

// Reads a single project by its ID
app.get("/projects/:projectID", (req, res) => {
  // Reads a project
});

// Creates a project inside a workspace
app.post("/workspaces/:workspaceID/projects", (req, res) => {
  // Creates a project in a workspace
});

// Updates part of an existing project
app.patch("/projects/:projectID", (req, res) => {
  // Updates a project
});

// Deletes a project by its ID
app.delete("/projects/:projectID", (req, res) => {
  // Deletes a project
});

// Lists all tasks belonging to a project
app.get("/projects/:projectID/tasks", (req, res) => {
  // Lists tasks in a project
});

// Reads a single task by its ID
app.get("/tasks/:taskID", (req, res) => {
  // Reads a task
});

// Creates a task inside a project
app.post("/projects/:projectID/tasks", (req, res) => {
  // Creates a task in a project
});

// Updates part of an existing task
app.patch("/tasks/:taskID", (req, res) => {
  // Updates a task
});

// Deletes a task by its ID
app.delete("/tasks/:taskID", (req, res) => {
  // Deletes a task
});


app.listen(3000, ()=> {
    console.log("The server is live on port 3000");
});

