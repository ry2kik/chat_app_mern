import bcrypt from 'bcrypt'
import User from '../model/user.model.js'
import validateData from '../utils/Validation.js'
import cloudinary from '../utils/Cloudinary.js'
import { sendWelcomeEmail } from '../emails/emailHandlers.js'

export const registerController = async (req, res) => {
    try {
        validateData(req);
        const { name, email, password } = req.body;

        // TODO Checking user alreday exist or not
        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: 'User already existed.' });

        // TODO Adding saltRound and making hashPassword
        const saltRound = parseInt(process.env.SALT_ROUND);
        const genSalt = bcrypt.genSaltSync(saltRound)
        const hashPassword = bcrypt.hashSync(password, genSalt);

        // TODO Creating new User and saving it in the DB
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        await sendWelcomeEmail(user.email, user.name, process.env.CLIENT_URL);
        return res.status(200).json({ message: 'New user added successfully', user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // TODO Checking all fields available or not
        if (!email || !password) {
            return res.status(400).json({ message: 'All the fields required' });            
        }

        // TODO Checking user alreday exist or not
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(400).json({ message: "User doesn't exists" });

        // TODO Compare password
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Not a valid password' });
        }

        const token = await existingUser.getJWT();
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV == "devolopment" ? false : true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).send({ message: 'Login successful!', token: token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const logoutController = (req, res) => {
    res.cookie("token", "", {
        maxAge: 0
    });

    res.status(200).json("Logged out successfully");
}

export const updateProfileController = async (req, res) => {
    try {
        const { pic } = req.body;
        if (!pic)
            return res.status(400).json({ message: "Profile pic is required" });

        const { _id } = req.user;
        const uploadResponse = await cloudinary.uploader.upload(pic);
        const updateUser = await User.findByIdAndUpdate(
            _id, 
            { pic: uploadResponse.secure_url }, 
            { new: true }
        );

        return res.status(200).json({ message: 'Your profile pic has been updated', updateUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}