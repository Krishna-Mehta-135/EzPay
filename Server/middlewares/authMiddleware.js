import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log("🔎 Auth Middleware Hit");
    console.log("🔑 JWT Secret in Middleware:", process.env.JWT_SECRET);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "No token provided or incorrect format." });
    }

    const token = authHeader.split(" ")[1];
    console.log("📜 Received Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified Successfully:", decoded);
        req.userId = decoded._id;
        next();
    } catch (error) {
        console.error("❌ Token verification failed:", error.message);
        return res.status(403).json({ error: "User id couldn't be verified" });
    }
};

export {authMiddleware}
