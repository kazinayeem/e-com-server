import express from "express";
import {
  userlogincontroller,
  userRegisterController,
  validationUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userlogincontroller);
router.get("/activeuser/:id", validationUser);

export default router;
