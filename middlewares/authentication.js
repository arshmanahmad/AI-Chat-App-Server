import { User } from "../models/uesrModel";

const authenticate = async (req, res, next) => {
    const token = req.header("authorization") && req.header("authorization").split(" ")[1];
    if (token) {
        try {
            const userObj = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: userObj.userId });
            if (!user) {
                res.status(401).send("Invalid token")
                return;
            }
            if (!user.inValid) {
                res.status(401).send("User is not valid");
            }
            req.user = userObj
            next()
        } catch (e) {

        }
    }
}