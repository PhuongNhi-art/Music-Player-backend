require('dotenv').config()
const UserRepository = require('../repositories/UserRepository');
const User = require('../models/UserModel');
const UserValidation = require('../validations/UserValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { error } = UserValidation.loginValidation(req.body);
            if (error) {
                return res.status(400).json({
                    message: error.details[0].message
                })
            }
            const user = await User.findOne({email: email});
            if (!user){
                return res.status(400).json({
                    message: 'Invalid email'
                })
            }
                
            if (!await bcrypt.compare(password, user.password)){
                return res.status(400).json({
                    message:'Invalid password'
                })
            }
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
            return res.header('auth-token', token).json({
                message: {
                    user, token: token,
                }
            })
            
        } catch (e) {
            return res.status(400).json({
                message: e
            })
        }
    }
    async register(req, res) {

        const { error } = UserValidation.registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const { email, username, password } = req.body;
        const user = new User({
            username: username,
            email: email,
            password: password,
        });
        const emailExist = await User.findOne({ email: email });
        if (emailExist) return res.status(400).send('Email already exist');
        try {
            const savedUser = await user.save();
            const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET)
            return res.header('auth-token', token).json({
                message: {
                    savedUser, token: token,
                }
            })
        }
        catch (e) {
            return res.status(400).json({
                message: e
            })
        }

    }
}
module.exports = new UserController();