import jwt from "jsonwebtoken";

export const accessTokenGenerator = async (payload) => {
  return await jwt.sign(payload, process.env.SECRECT_TOKEN, {
    expiresIn: "30d",
  });
};
