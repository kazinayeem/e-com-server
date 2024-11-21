import jwt from "jsonwebtoken";
import User from "../model/user.mode.js";

export const refreshTokenGenerator = async (payload) => {
  const token = await jwt.sign(payload, process.env.SECRECT_TOKEN, {
    expiresIn: "7 day",
  });

  await User.findOneAndUpdate(
    { _id: payload.id },
    {
      $set: {
        refresh_token: token,
      },
    },
    { new: true }
  );
  return token;
};
