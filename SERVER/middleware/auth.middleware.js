const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        // Validate the Authorization header
        if (!authHeader || !authHeader.toLowerCase().startsWith("bearer")) {
            return res.status(400).json({
                message: "Token is required !!",
                success: false,
            });
        }

        // Extract the token from the header
        const token = authHeader.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Unauthorized User !!",
                    success: false,
                });
            }

            // Attach the user ID to the request object
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "SERVER ERROR",
            success: false,
        });
    }
};

module.exports = authUser;
