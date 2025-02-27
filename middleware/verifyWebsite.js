// imports
const express = require("express");
const router = express.Router();





// ^ Middleware for authentication
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.source;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized Source Detected!', success: false });
    }

    const token = authHeader;
    try {
        if (token === "admin_admin_admin") {
            next();
        }
        else {
            return res.status(403).json({ message: 'Unauthorized Source detected!', success: false });
        }
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized Source detected!', success: false });
    }
};


module.exports = authMiddleware;