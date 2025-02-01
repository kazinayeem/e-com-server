import express from "express";
import {
  userlogincontroller,
  userRegisterController,
  validationUser,
  seealluserController,
  LogOutController,
  SendOtpController,
  CheckOtpController,
  SingleUser,
} from "../controller/user.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkLogin } from "../middleware/checkLogin.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userlogincontroller);
router.post("/logout", checkLogin, LogOutController);
router.get("/alluser", checkAdmin, seealluserController);
router.get("/activeuser/:id", validationUser);
router.post("/forgotpassword/", SendOtpController);
router.post("/checkotp/", CheckOtpController);
router.put("/changepassword/", CheckOtpController);
router.get("/:id/", SingleUser);

export default router;
