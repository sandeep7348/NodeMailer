import express from "express";
import { createUser, getUser, listUsers, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", listUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
