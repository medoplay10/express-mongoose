import { getLogin, postLogin, logout } from "../controllers/auth.controller";
import { Router } from "express";
const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", logout);
export { router as authRoute };
