import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connect to DB successfully!");
    })
    .catch((err) => {
      console.error("Connect to DB failed!", err);
    });
};

export default connect;
