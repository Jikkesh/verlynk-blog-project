import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import user from "../models/auth.js"

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: 400, message: "USER_EXIST" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await user.create({ name, email, password: hashedPassword });
        return res.status(201).json({ status: 201, message: "USER_SIGNUP" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "SERVER_ERROR" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const oldUser = await user.findOne({ email });

        if (!oldUser) {
            return res.status(404).json({ status: 404, message: "USER_NOTEXIST" });
        }
        else {
            var name = oldUser.name
        }

        const comparePassword = await bcrypt.compare(password, oldUser.password);
        if (!comparePassword) {
            return res.status(400).json({ status: 400, message: "PASSWORD_WRONG" });
        }

        const token = jwt.sign({ name: name, email: oldUser.email, id: oldUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" });
        return res.status(200).json({ status: 200, name: oldUser.name, token: token, message: "LOGIN_SUCCESS" })
    }
    catch {
        res.status(500).json({ status: 500, message: "SERVER_ERROR" });
    }
};



