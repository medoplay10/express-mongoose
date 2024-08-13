import { Router } from "express";

import {
  addProduct,
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.post("/add-product", addProduct);

router.get("/all-products", allProducts);

router.get("/single-product/:productId", singleProduct);

router.patch("/update-product/:productId", updateProduct);

router.delete("/delete-product/:productId", deleteProduct);

export { router as productRoute };
