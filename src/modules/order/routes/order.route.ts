import { Router } from "express";
const router = Router();
import {userMakeOrder} from "../controllers/order.controller";

router.post("/user-make-order", userMakeOrder);
export { router as orderRoute }