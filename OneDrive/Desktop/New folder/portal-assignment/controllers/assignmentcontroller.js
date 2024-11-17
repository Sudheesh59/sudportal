const Assignment = require('../models/assignment'); 
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('userId', 'name email') 
            .populate('admin', 'name email'); 
        res.status(200).json({
            success: true,
            data: assignments,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch assignments. Please try again later.',
        });
    }
};
module.exports = {
    getAssignments,
};
