import express from 'express';
import connectDB from './config/dbConfig' // Adjust the path as needed
import userRoutes from './routes/userRoutes'; // Adjust the path as needed
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Check MongoDB connection
const dbConnectionCheck = async () => {
    try {
        await connectDB();
        console.log('MongoDB is connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

// Start the server
const startServer = async () => {
    await dbConnectionCheck(); // Check DB connection before starting the server

    app.use('/api/users', userRoutes); // Set your user routes

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
