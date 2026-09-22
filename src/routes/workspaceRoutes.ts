import { Router } from "express";
import {
  createWorkspace, getWorkspaces, getWorkspaceById, updateWorkspace, deleteWorkspace
} from "../controllers/workspaceController";

const router = Router();

router.get("/", getWorkspaces);
router.get("/:workspaceID", getWorkspaceById);
router.post("/", createWorkspace);
router.patch("/:workspaceID", updateWorkspace);
router.delete("/:workspaceID", deleteWorkspace);

export default router;