const express = require('express');
const router = express.Router();
const {registerUser, loginUser, uploadAssignment} = require('../controllers/usercontroller');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', uploadAssignment);
module.exports = router;