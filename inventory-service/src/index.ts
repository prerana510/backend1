import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig'
import inventoryRoutes from './routes/inventoryRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
=======
const PORT = process.env.PORT || 5002;
>>>>>>> dbab1617037094653828be4d432305f676a4bfec

connectDB();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// Use branch routes
app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`Branch Service is running on http://localhost:${PORT}`);
=======
    console.log(`Inventory Service is running on http://localhost:${PORT}`);
>>>>>>> dbab1617037094653828be4d432305f676a4bfec
});
