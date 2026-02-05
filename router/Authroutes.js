const express = require('express');
const authController = require('../controller/authController');
const { loginValidation } = require('../validators/authValidator');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');


router.post('/login', loginValidation, authController.login);

router.get('/verify-profile', verifyToken, (req, res) => {
    res.json({ success: true, user: req.user });
});
module.exports = router;