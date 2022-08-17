const { User } = require("../models");
const { verifyToken } = require("../helper/jwt");

async function authentication(req, res, next) {
    try {

        let { access_token } = req.headers;
        if (!access_token) {
            throw { name: "NoToken" };
        }
        let payload = verifyToken(access_token);
        let user = await User.findByPk(payload.id);
        if (!user) {
            throw { name: "Unauthorized" };
        }
        req.user = {
            id: user.id,
        };
        next();
    } catch (error) {
        next(error);
    }
}



module.exports = authentication;