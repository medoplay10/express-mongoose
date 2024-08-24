import { getLogin, postLogin } from "../controllers/auth.controller";
import { Router } from "express";
const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
export { router as authRoute };
