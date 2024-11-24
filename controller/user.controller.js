import User from "../model/user.mode.js";
import bcrypt from "bcrypt";
import { sendMailConfig } from "../config/sendMail.js";
import { accessTokenGenerator } from "../config/accessTokenGen.js";
import { refreshTokenGenerator } from "../config/refreshTokenGen.js";
import { otpGen } from "../config/otpGenetor.js";

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

    const link = `http://localhost:5000/api/v1/user/activeuser/${result._id}`;
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
          const accessToken = await accessTokenGenerator(payload);
          const refreshToken = await refreshTokenGenerator(payload);
          const cookieOption = {
            http: true,
            secure: true,
            sameSite: "None",
          };
          res.cookie("accessToken", accessToken, cookieOption);
          res.cookie("refreshToken", refreshToken, cookieOption);
          return res.status(200).json({
            message: "Login in successfull",
            error: false,
            success: true,
            accessToken: "Bearer " + accessToken,
            refreshToken: "Bearer " + refreshToken,
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

export const seealluserController = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(500).json({
      totaluser: user.length,
      error: false,
      success: true,
      user: user,
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

export const LogOutController = (req, res) => {
  try {
    const cookieOption = {
      http: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookieOption);
    res.clearCookie("refreshToken", cookieOption);
    return res.status(200).json({
      message: "Logout successfull",
      error: false,
      success: true,
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

export const SendOtpController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }
    const otp = otpGen();
    const password_expiry = Date.now() + 60 * 60 * 1000; // 1 hour from now
    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        forgot_password_otp: otp,
        forgot_password_expiry: new Date(password_expiry).toISOString(),
      }
    );
    await sendMailConfig(user.email, `OTP ${otp}`, `OTP ${otp}`);
    return res.status(200).json({
      message: "OTP send successfull check your mail",
      error: false,
      success: true,
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

export const CheckOtpController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }

    const current_time = new Date().toISOString();
    if (user.forgot_password_expiry < current_time) {
      return res.status(400).json({
        message: "otp expiy",
        error: false,
        success: true,
      });
    }

    if (user.forgot_password_otp === req.body.otp) {
      return res.status(200).json({
        message: "otp match",
        error: false,
        success: true,
      });
    }

    return res.status(400).json({
      message: "otp not match",
      error: true,
      success: false,
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
export const changePasswordController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(req.body.password, salt);
    await User.findOneAndUpdate({ email: email }, { password: hash_password });
    return res.status(200).json({
      message: "password change successfull",
      error: true,
      success: false,
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
