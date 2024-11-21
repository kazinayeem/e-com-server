import jwt from "jsonwebtoken";
import User from "../model/user.mode.js";

export const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  const maintoken = token.split(" ")[1];
  try {
    const { id } = jwt.verify(maintoken, process.env.SECRECT_TOKEN);
    const user = await User.findOne({ _id: id });
    if (user.role === "ADMIN") {
      next();
    } else {
      return res.status(400).json({
        message: "only can access admin",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
