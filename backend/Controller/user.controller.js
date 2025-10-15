const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const validateData = require('../utils/Validation');

exports.registerUser = async (req, res) => {
    try {
        validateData(req);
        const { name, email, password, pic } = req.body;

        // TODO Checking user alreday exist or not
        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: 'User already existed.' });

        // TODO Adding saltRound and making hashPassword
        const saltRound = parseInt(process.env.SALT_ROUND);
        const genSalt = bcrypt.genSaltSync(saltRound)
        const hashPassword = bcrypt.hashSync(password, genSalt);

        // TODO Creating new User and saving it in the DB
        const user = new User({ name, email, password: hashPassword, pic });
        await user.save();
        return res.status(200).json({ message: 'New user added successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.loginUser = async (req, res) => {
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
        return res.status(200).send({ message: 'Login successful!', token: token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}