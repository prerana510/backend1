import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig'
<<<<<<< HEAD
import inventoryRoutes from './routes/productRoutes';
=======
import productRoutes from './routes/productRoutes';
>>>>>>> dbab1617037094653828be4d432305f676a4bfec
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// Use branch routes
<<<<<<< HEAD
app.use('/api/product', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`Branch Service is running on http://localhost:${PORT}`);
=======
app.use('/api/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Product Service is running on http://localhost:${PORT}`);
>>>>>>> dbab1617037094653828be4d432305f676a4bfec
});
