const express = require('express');
const { getAssignments } = require('../controllers/assignmentcontroller');
const router = express.Router();
router.get('/', getAssignments);
module.exports = router;