import express from "express";
import upload from "../config/multer.js";
import {
  addRoom,
  deleteRoom,
  getAllRooms,
  getOwnersRoom,
} from "../controllers/room.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isOwner } from "../middleware/isOwner.js";

const router = express.Router();

router.post(
  "/add",
  isAuthenticated,
  isOwner,
  upload.array("image", 4),
  addRoom,
);
router.get("/owner", isAuthenticated, getOwnersRoom);
router.get("/all", getAllRooms);
router.delete("/delete/:id", isAuthenticated, isOwner, deleteRoom);

export default router;
