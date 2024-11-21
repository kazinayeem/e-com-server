import jwt from "jsonwebtoken";
import User from "../model/user.mode.js";

export const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const maintoken = token.split(" ")[1];
      const { id } = await jwt.verify(maintoken, process.env.SECRECT_TOKEN);
      const user = await User.findOne({ _id: id });
      if (user.role === "ADMIN") {
        next();
      } else {
        return res.status(200).json({
          message: "only can access admin",
          success: false,
          error: true,
        });
      }
    } else {
      return res.status(200).json({
        message: "token not found or expired",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
