import validator from 'validator'

const validateData = (req) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        throw new Error("Fill all the fields");
        
    if (!validator.isEmail(email))
        throw new Error("Not a valid email address");
        
    if (!validator.isStrongPassword(password))
        throw new Error("Not a strong password");
}

export default validateData;