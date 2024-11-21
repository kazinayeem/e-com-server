import jwt from "jsonwebtoken";

export const checkLogin = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken || req?.headers?.authorization;

    if (accessToken) {
      const user = await jwt.verify(accessToken, process.env.SECRECT_TOKEN);
      if (!user) {
        return res.status(200).json({
          message: "unauthorized token",
          success: false,
          error: true,
        });
      }

      next();
    } else {
      return res.status(400).json({
        message: "token not found or expired",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "token not found or expired",
      success: false,
      error: true,
    });
  }
};
