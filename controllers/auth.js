import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


/* Register User*/

// Calling Mongodb backend -> database
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 999)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log(res.status, "Test Res Status");
    } catch (err) {
        res.status(500).json({
            err: err.message
        });
        console.log(res.status, "Test Res Status");
    }
};

/* Login */

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            email: email
        });
        if (!user) return res.status(400).json({
            message: "User does not exist."
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid Credential'})


    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
