import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig'
import inventoryRoutes from './routes/inventoryRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// Use branch routes
app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`Inventory Service is running on http://localhost:${PORT}`);
});
