const jwt = require('jsonwebtoken');
const secret_key = "$uperman123";

function authMiddleware(req, res, next) {
    const token = req.cookies.authToken; // Retrieve the token from the cookie
    console.log(token);

    if (!token) {
        return res.status(401).json({ success: false, msg: "Unauthorized access. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secret_key); // Verify the token
        console.log(req.user);
        
        req.user = decoded; // Attach decoded data (username, email, etc.) to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ success: false, msg: "Invalid or expired token." });
    }
}

module.exports = authMiddleware;
