const Admin = require('../models/admin');
const Assignment = require('../models/assignment');
const jwt = require('jsonwebtoken');
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = new Admin({username, password});
        await admin.save();
        res.status(201).json({message: 'Admin registered successfully'});
    } catch (err) {
        res.status(400).json({error: 'Error registering admin'});
    }
};
const loginAdmin = async (req, res) =>{
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({username});
        if (!admin) return res.status(400).json({error: 'Admin not found'});

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(400).json({error: 'Invalid credentials'});

        const token = jwt.sign({adminId: admin._id }, 'secretKey');
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
};
const getAssignments = async (req, res) =>{
    try {
        const adminId = req.adminId;
        const assignments = await Assignment.find({admin: adminId});
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({error: 'Error fetching assignments'});
    }
};
const acceptAssignment = async (req, res) =>{
    try {
        const { id } = req.params;
        await Assignment.findByIdAndUpdate(id, {status: 'accepted'});
        res.status(200).json({message: 'Assignment accepted'});
    } catch (err) {
        res.status(500).json({error: 'Error accepting assignment'});
    }
};
const rejectAssignment = async (req, res) =>{
    try {
        const { id } = req.params;
        await Assignment.findByIdAndUpdate(id, { status: 'rejected'});
        res.status(200).json({message: 'Assignment rejected' });
    } catch (err) {
        res.status(500).json({error: 'Error rejecting assignment'});
    }
};
module.exports = {registerAdmin, acceptAssignment, getAssignments, loginAdmin, rejectAssignment}