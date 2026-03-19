import express from "express";
import {
  bookRoom,
  cancelBooking,
  checkRoomAvailability,
  confirmBooking,
  getHotelBooking,
  getUserBooking,
  stripePayment,
  verifyPayment,
} from "../controllers/book.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkRoomAvailability);

bookingRouter.post("/book", isAuthenticated, bookRoom);

bookingRouter.post("/stripe-payment", isAuthenticated, stripePayment);

bookingRouter.get("/verify-payment", isAuthenticated, verifyPayment);

bookingRouter.get("/user", isAuthenticated, getUserBooking);

bookingRouter.get("/hotel", isAuthenticated, getHotelBooking);

bookingRouter.put("/confirm/:id", isAuthenticated, confirmBooking);

bookingRouter.delete("/cancel/:id", isAuthenticated, cancelBooking);

export default bookingRouter;
