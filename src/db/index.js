import mongoose from "mongoose"

const DB_NAME = "Educase"

const URL = "mongodb+srv://test:scWXsfZtqFKe4hKW@cluster0.gvtvr.mongodb.net"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${URL}/${DB_NAME}`)
        console.log(`\n mongoDB Connected || DB Host: ${connection.connection.host}`);
        console.log('Connected to database:', mongoose.connection.name);
    } catch (error) {
        console.error("MongoDB connection error: ",error)
        process.exit(1)
    }
}


export default connectDB;