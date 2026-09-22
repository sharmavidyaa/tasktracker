import { Request, Response } from "express";
import Workspace from "../models/workspace";

export async function createWorkspace(req: Request, res: Response) {
  const name = req.body.name;
  const ownerId = "000000000000000000000000"; // TODO: replace with real auth in Step 8

  try {
    const workspace = await Workspace.create({ name, owner: ownerId, members: [ownerId] });
    res.status(201).json(workspace);
  } catch (err) {
    console.log("Wasn't able to create the workspace", err);
    res.status(500).json({ message: "workspace wasn't created" });
  }
}

export async function getWorkspaces(req: Request, res: Response) {
  try {
    const workspacesArr = await Workspace.find({});
    if (workspacesArr.length === 0) {
      res.status(200).json({ message: "No workspaces exist at this moment, create one" });
    } else {
      res.status(200).json(workspacesArr);
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong fetching workspaces" });
  }
}

export async function getWorkspaceById(req: Request, res: Response) {
  try {
    const workspaceID = req.params.workspaceID;
    const workspace = await Workspace.findById(workspaceID);
    if (!workspace) {
      res.status(404).json({ message: "Couldn't find that workspace" });
    } else {
      res.status(200).json(workspace);
    }
  } catch {
    res.status(500).json({ message: "Couldn't find the workspace" });
  }
}

export async function updateWorkspace(req: Request, res: Response) {
  try {
    const workspaceID = req.params.workspaceID;
    const { name } = req.body; // allowlist: only `name` is updatable here
    const updated = await Workspace.findByIdAndUpdate(workspaceID, { name }, { new: true });
    if (!updated) {
      res.status(404).json({ message: "Couldn't find that workspace" });
    } else {
      res.status(200).json(updated);
    }
  } catch {
    res.status(500).json({ message: "Couldn't update the workspace" });
  }
}

export async function deleteWorkspace(req: Request, res: Response) {
  try {
    const workspaceID = req.params.workspaceID;
    const deleted = await Workspace.findByIdAndDelete(workspaceID);
    if (!deleted) {
      res.status(404).json({ message: "Couldn't find that workspace" });
    } else {
      res.status(200).json({ message: "Workspace deleted", workspace: deleted });
    }
  } catch {
    res.status(500).json({ message: "Couldn't delete the workspace" });
  }
}