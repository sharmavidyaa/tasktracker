import { Request, Response } from "express";
import Task from "../models/task";
import mongoose from "mongoose";

// Nested: list tasks in a project, with filtering
export async function getTasksInProject(req: Request, res: Response) {
  try {
    const { projectID } = req.params as { projectID: string };
    const { status, assignee, overdue } = req.query;

    const filter: Record<string, any> = { project: new mongoose.Types.ObjectId(projectID) };

    if (status) filter.status = status;
    if (assignee) filter.assignee = new mongoose.Types.ObjectId(assignee as string);
    if (overdue === "true") filter.dueDate = { $lt: new Date() };

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch {
    res.status(500).json({ message: "Couldn't fetch tasks" });
  }
}

// Nested: create task in a project
export async function createTask(req: Request, res: Response) {
  try {
    const { projectID } = req.params as { projectID: string };
    const { title, status, assignee, dueDate } = req.body; // allowlist
    const task = await Task.create({
      title,
      status,
      assignee: assignee ? new mongoose.Types.ObjectId(assignee) : null,
      dueDate,
      project: new mongoose.Types.ObjectId(projectID),
    });
    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Couldn't create task" });
  }
}

// Flat: read one
export async function getTaskById(req: Request, res: Response) {
  try {
    const { taskID } = req.params as { taskID: string };
    const task = await Task.findById(taskID);
    if (!task) {
      res.status(404).json({ message: "Couldn't find that task" });
    } else {
      res.status(200).json(task);
    }
  } catch {
    res.status(500).json({ message: "Couldn't fetch the task" });
  }
}

// Flat: update
export async function updateTask(req: Request, res: Response) {
  try {
    const { taskID } = req.params as { taskID: string };
    const { title, status, assignee, dueDate } = req.body; // allowlist
    const updated = await Task.findByIdAndUpdate(
      taskID,
      { title, status, assignee, dueDate },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: "Couldn't find that task" });
    } else {
      res.status(200).json(updated);
    }
  } catch {
    res.status(500).json({ message: "Couldn't update the task" });
  }
}

// Flat: delete
export async function deleteTask(req: Request, res: Response) {
  try {
    const { taskID } = req.params as { taskID: string };
    const deleted = await Task.findByIdAndDelete(taskID);
    if (!deleted) {
      res.status(404).json({ message: "Couldn't find that task" });
    } else {
      res.status(200).json({ message: "Task deleted", task: deleted });
    }
  } catch {
    res.status(500).json({ message: "Couldn't delete the task" });
  }
}