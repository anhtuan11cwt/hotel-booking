import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối cơ sở dữ liệu");
  } catch (error) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", error);
    process.exit(1);
  }
};

export default connectDB;
