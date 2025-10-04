import mongoose from "mongoose";

export async function connectToDB(){
    try {
     await mongoose.connect(process.env.MONGODB_URI)
      console.log('Database connected successfully')     
    } catch (error) {
     console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); 
    }
}
