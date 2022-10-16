const { User } = require("../models");

class Register {
    static async postRegister(req, res, next) {
        try {
            let { email, username, password } = req.body;
            if (email) {
                email = email.toLowerCase();
            }
            const findUser = await User.findOne({ where: { email } });
            if (findUser) {
                throw { name: "EmailAlreadyExists" };
            }
            const data = await User.create({
                email,
                username,
                password,
                photo: "https://ik.imagekit.io/ryufang/ae91e4161c6f7e3c18815680aa75cf44_UFGEx8f5t.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1665859246375"
            });
            res.status(201).json({
                message: `${email} successfully registered`,
                email: email,

            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Register;