import { Router } from "express";
import { addProductToCart, getCart, removeProductsFromCart } from "../controllers/user.controller";
const router = Router();

router.post("/add-product-to-cart", addProductToCart);

router.patch("/remove-products-from-cart", removeProductsFromCart);

router.get("/get-cart", getCart);

export { router as userRoute };
