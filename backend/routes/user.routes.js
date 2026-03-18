import express from "express";
import {
  isAuth,
  login,
  logout,
  signUp,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/is-auth", isAuthenticated, isAuth);

export default router;
