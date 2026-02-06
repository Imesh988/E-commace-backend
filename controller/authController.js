const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const superAdminModal = require('../model/superAdminModal');
const userModel = require('../model/userModel');


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '24h';

const authController = {
    login: async (req, res) => {
       try {
         const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { email, password , isFirebaseLogin } = req.body;

        const [superAdminRows] = await superAdminModal.findByUseremail(email);

        if (superAdminRows.length > 0) {
            const superAdmin = superAdminRows[0];

           if (!isFirebaseLogin) {
                const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ success: false, message: 'Invalid password' });
                }
            }

            const token = jwt.sign(
                {
                    id: superAdmin.super_admin_id,
                    username: superAdmin.user_name,
                    email: superAdmin.email,
                    role: 'super_admin'
                },
                JWT_SECRET,
                {
                    expiresIn: JWT_EXPIRES
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                role: 'super_admin',
                token,
                user: {
                    id: superAdmin.super_admin_id,
                    username: superAdmin.user_name,
                    name: superAdmin.super_admin_name,
                    email: superAdmin.email
                }
            });
        }

        const [userRows] = await userModel.findByUseEmail(email);

        if (userRows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const user = userRows[0];

        if (!isFirebaseLogin) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }

        const token = jwt.sign(
            {
                id: user.user_id,
                email: user.email,
                role: 'user'
            },
              JWT_SECRET,
                { expiresIn: JWT_EXPIRES }
        );
         return res.status(200).json({
                success: true,
                message: 'Login successful',
                role: 'user',
                token,
                user: {
                    id: user.user_id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    mobileNo: user.mobile_no_1
                }
            });
       } catch (error) {
        console.error('Login error:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred during login',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
       }
    }
}

module.exports = authController;