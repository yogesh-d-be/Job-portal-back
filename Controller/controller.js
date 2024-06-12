const userDB = require('../Model/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegPost = async (req, res) => {
    try {
        const { name, email, password, MobileNumber } = req.body;
        const userExist = await userDB.findOne({ email:email });

        if (userExist) {
            return res.status(409).json({ error: "User already exists", success: false });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userDB({
            name,
            email,
            password: hashPassword,
            MobileNumber,
        });

        await newUser.save();
        return res.status(201).json({
            data: newUser,
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        // console.error("Error in user registration:", error);
        return res.status(400).json({
            message: "Invalid Details",
            success: false,
        });
    }
};

const login = async (req, res) => {

    const {email,password} = req.body
    try {
        const user = await userDB.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Password doesn't match", success: false });
        }

        const preuser = await userDB.findOne({ email });

        

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "13d",
        });

        return res.status(200).json({
            message: "Login successful",
            success: true,
            data: token,
        });
    } catch (error) {
        // console.error("Error in user login:", error);
        return res.status(400).json({
            message: "Invalid Details",
            success: false,
        });
    }
};

module.exports = {
    userRegPost,
    login
};
