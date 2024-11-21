import User from "../model/user.mode.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMailConfig } from "../config/sendMail.js";
export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "please provide name , email , and password",
        error: true,
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "this email is already registered",
        error: true,
        success: false,
      });
    }
    //reg new user part
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    const payload = {
      name: name,
      email: email,
      password: hash_password,
    };
    const newUser = new User(payload);
    const result = await newUser.save();

    const link = `http://localhost:5000/api/v1/activeuser/${result._id}`;
    await sendMailConfig(email, "active link", link, link)
      .then(() => {
        return res.status(201).json({
          data: result,
          success: true,
          error: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const userlogincontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "please provide name , email , and password",
        error: true,
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        if (user.isvalidator) {
          const payload = {
            name: user.name,
            email: user.email,
            id: user._id,
          };
          const token = await jwt.sign(payload, process.env.SECRECT_TOKEN, {
            expiresIn: "1h",
          });
          return res.status(200).json({
            message: "Login in successfull",
            error: false,
            success: true,
            token: "Bearer " + token,
          });
        } else {
          return res.status(200).json({
            message: "please check your mail and active your account",
            error: false,
            success: true,
          });
        }
      } else {
        return res.status(400).json({
          message: "password not match",
          error: true,
          success: false,
        });
      }
    } else {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const validationUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (user.isvalidator) {
      return res.status(200).json({
        message: "already actived",
        error: true,
        success: false,
      });
    } else {
      const activeduser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { isvalidator: true },
        },
        { new: true }
      );
      await sendMailConfig(activeduser.email, "ACTIVED", "ACTIVE SUCCESSFULL");
      return res.status(200).json({
        message: "active successfull",
        error: true,
        success: false,
        activeduser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};
