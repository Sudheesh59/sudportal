const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');
const authUser = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const authAdmin = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.adminId).select('-password');
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
module.exports = { authUser, authAdmin };