import express from "express";
import upload from "../config/multer.js";
import {
  deleteHotel,
  getAllHotels,
  getOwnerHotels,
  registerHotel,
} from "../controllers/hotel.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isOwner } from "../middleware/isOwner.js";

const router = express.Router();

router.post(
  "/register",
  isAuthenticated,
  isOwner,
  upload.single("image"),
  registerHotel,
);
router.get("/get", isAuthenticated, getOwnerHotels);
router.get("/getall", getAllHotels);
router.delete("/delete/:id", isAuthenticated, isOwner, deleteHotel);

export default router;
