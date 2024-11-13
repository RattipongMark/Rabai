const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');
// const { use } = require('../routes/authRoute');

// register
exports.signup = async (req, res, next) => {
    try {
        const { email, password, name, profile } = req.body;

        // Check if email ends with @mail.kmutt.ac.th
        if (!email.endsWith('@mail.kmutt.ac.th')) {
            return next(new createError('Email must be a valid @mail.kmutt.ac.th address', 400));
        }

        const user = await User.findOne({ email });

        if (user) {
            return next(new createError('User already exists!', 400));
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            profile
        });

        // JWT token
        const token = jwt.sign({ _id: newUser._id }, 'secretKey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                profile: newUser.profile
            },
        });

    } catch (error) {
        next(error);
    }
};



// Login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return next(new createError('User not found!', 404));
        }

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new createError('Invalid Email or Password', 401));
        }

        const token = jwt.sign({ _id: user._id }, 'secretKey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            token,
            message: 'Logged in successfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile: user.profile
            }
        })

    } catch (error) {
        next(error);
    }
};