import mongoose from "mongoose";
const url = `mongodb+srv://abhi9572500749verma:NWG5w6vbuQrp4TfE@cluster0.uj2mk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

export default async function mongoConnect() {
    console.log("mongoConnect called");
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(url);
            console.log("MongoDB connected successfully.");
        }
        return mongoose.connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("MongoDB connection failed");
    }
}



