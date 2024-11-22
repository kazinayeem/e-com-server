import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkLogin } from "../middleware/checkLogin.js";
import { createAddressController, getAllAddressController } from "../controller/address.controller.js";


const router = express.Router();

router.get("/",checkLogin, getAllAddressController);
router.post("/",checkLogin, createAddressController);


router.delete("/:id" , checkAdmin, checkLogin)

export default router;
