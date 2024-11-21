import express from "express";
import {
  userlogincontroller,
  userRegisterController,
  validationUser,
  seealluserController,
  LogOutController,
} from "../controller/user.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkLogin } from "../middleware/checkLogin.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userlogincontroller);
router.post("/logout", checkLogin, LogOutController);
router.post("/alluser", checkAdmin, seealluserController);
router.get("/activeuser/:id", validationUser);

export default router;
