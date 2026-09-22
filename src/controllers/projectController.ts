import { Request, Response } from "express";
import Project from "../models/project";
import mongoose from "mongoose";

// Nested: list projects in a workspace
export async function getProjectsInWorkspace(req: Request, res: Response) {
  try {
    const { workspaceID } = req.params as { workspaceID: string };
    const projects = await Project.find({ workspace: new mongoose.Types.ObjectId(workspaceID) });
    res.status(200).json(projects);
  } catch {
    res.status(500).json({ message: "Couldn't fetch projects" });
  }
}

// Nested: create project in a workspace
export async function createProject(req: Request, res: Response) {
  try {
    const { workspaceID } = req.params as { workspaceID: string };
    const { name } = req.body;
    const project = await Project.create({ name, workspace: new mongoose.Types.ObjectId(workspaceID) });
    res.status(201).json(project);
  } catch {
    res.status(500).json({ message: "Couldn't create project" });
  }
}

// Flat: read one
export async function getProjectById(req: Request, res: Response) {
  try {
    const { projectID } = req.params as { projectID: string };
    const project = await Project.findById(projectID);
    if (!project) {
      res.status(404).json({ message: "Couldn't find that project" });
    } else {
      res.status(200).json(project);
    }
  } catch {
    res.status(500).json({ message: "Couldn't fetch the project" });
  }
}

// Flat: update
export async function updateProject(req: Request, res: Response) {
  try {
    const { projectID } = req.params as { projectID: string };
    const { name } = req.body; // allowlist
    const updated = await Project.findByIdAndUpdate(projectID, { name }, { new: true });
    if (!updated) {
      res.status(404).json({ message: "Couldn't find that project" });
    } else {
      res.status(200).json(updated);
    }
  } catch {
    res.status(500).json({ message: "Couldn't update the project" });
  }
}

// Flat: delete
export async function deleteProject(req: Request, res: Response) {
  try {
    const { projectID } = req.params as { projectID: string };
    const deleted = await Project.findByIdAndDelete(projectID);
    if (!deleted) {
      res.status(404).json({ message: "Couldn't find that project" });
    } else {
      res.status(200).json({ message: "Project deleted", project: deleted });
    }
  } catch {
    res.status(500).json({ message: "Couldn't delete the project" });
  }
}