import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

const validateToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res.status(401).json({ message: 'Unauthorized - No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });

        const { _id } = decoded;
        const user = await User.findOne({ _id });
        if (!user)
            return res.status(400).json({ message: 'No user found' });

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export default validateToken