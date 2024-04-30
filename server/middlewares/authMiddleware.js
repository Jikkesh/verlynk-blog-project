import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)

    if (!token) {
        return res.status(401).json({ status: 401, message: 'Unauthorized: No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.exp <= Date.now() / 1000) {
            return res.status(401).json({ staus: 401, message: 'Unauthorized: Token expired' });
        }
        next();

    } catch (error) {
        return res.status(401).json({ message: `Unauthorized: ${error.message}` });
    }

}

export default authMiddleware;