import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`Mongo Db connected at port ${process.env.PORT}`);
    } catch (error) {
        console.log("error: ", error);
        throw error;
        process.exit(1);
    }
};  


export default connectDB;