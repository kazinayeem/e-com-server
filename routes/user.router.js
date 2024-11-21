import express from "express";
import {
  userlogincontroller,
  userRegisterController,
  validationUser,
} from "../controller/user.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userlogincontroller);
router.post("/check", checkAdmin);
router.get("/activeuser/:id", validationUser);

export default router;
