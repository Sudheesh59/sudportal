const User = require('../models/user');
const Admin = require('../models/admin');
const Assignment = require('../models/assignment');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        //const user = new User({username, password});
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        res.status(400).json({error: 'Error registering user'});
    }
};
const loginUser = async (req, res) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({error: 'User not found'});

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({error: 'Invalid credentials'});

        const token = jwt.sign({userId: user._id}, 'secretKey');
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
};

const uploadAssignment = async (req, res) =>{
    try {
        const {task} = req.body;
        const userId = req.userId;
        const assignment = new Assignment({userId, task});
        await assignment.save();
        res.status(201).json({message: 'Assignment uploaded successfully'});
    } catch (err) {
        res.status(400).json({error: 'Error uploading assignment'});
    }
};
const getAllAdmins = async (req, res) =>{
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err){
        res.status(500).json({error: 'Error fetching admins'});
    }
};
module.exports = {registerUser, loginUser, uploadAssignment, getAllAdmins}