const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';


const verifyToken = (req, res, next) => {
    try {
        const authHeard = req.headers.authorization;

        if (!authHeard || !authHeard.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            })
        }

        const token = authHeard.substring(7);

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            })
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token.'
        })
    }

}
    const isSuperAdmin = (req, res, next) => {
        if (req.user && req.user.role === 'super_admin') {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Super Admin privileges required.'
            })
        }
    }

    const isUser = (req, res, next) => {
        if(req.user && req.user.role === 'user'){
            next();
        }else{
             return res.status(403).json({
            success: false,
            message: 'Access denied. User privileges required.'
        });
        }
    }

    const isAuthentiated = ( req, res , next ) => {
        if (req.user && (req.user.role === 'super_admin' || req.user.role === 'user')) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Authentication required.'
        });
    }
    }


module.exports = {
    verifyToken,
    isSuperAdmin,
    isUser,
    isAuthentiated

}