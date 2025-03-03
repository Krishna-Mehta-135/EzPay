import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({error: "No token provided or incorrect format."});
    }

    const token = authHeader.split(" ")[1];


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
        //I assigned the user id above which then gets transferred to the next()
    } catch (error) {
        return res.status(403).json({error: "User id couldn't be verified"});
    }
};

export {authMiddleware};
