import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
};

// User login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    else{
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    
    res.json({ token });
}
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
};
