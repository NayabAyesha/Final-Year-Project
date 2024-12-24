import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).redirect('/api/login');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
