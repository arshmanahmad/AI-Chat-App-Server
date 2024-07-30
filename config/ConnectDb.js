import mongoose from "mongoose";

const dbUrl = "mongodb://localhost:27017/First-Connection";
const connectDb = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Successfully pinged deployment, connected to DB!");
    } catch (e) {
        console.error("Error getting connected", e)
    }
}

export default connectDb;