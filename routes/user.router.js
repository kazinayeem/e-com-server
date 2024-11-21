import express from "express";
import {
  userlogincontroller,
  userRegisterController,
  validationUser,seealluserController
} from "../controller/user.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userlogincontroller);
router.post("/alluser", checkAdmin, seealluserController);
router.get("/activeuser/:id", validationUser);

export default router;
