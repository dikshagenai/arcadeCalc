// imports
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();





// ^ Middleware for authentication
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized Access!', success: false });
    }


    const token = authHeader;
    try {
        const decoded = jwt.verify(token, 'ArcadeCalcSecret'); // Replace with your actual secret key
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized access detected!', success: false });
    }
};


module.exports = authMiddleware;