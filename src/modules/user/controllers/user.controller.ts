import { User } from "../models/user.model";
import { Product } from "../../product/models/product.model";
import express, { Express, Request, Response } from "express";

const addProductToCart = async (req: any, res: any) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
     await req.user.addToCart(product, quantity);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(`Error adding product to cart: ${error}`);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

const getCart = async (req: any, res: any) => {
  try {
    const user = await req.user!.populate("cart.items.productId");
    res.status(200).json(user.cart);
  } catch (error) {
    console.error(`Error fetching cart: ${error}`);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

const removeProductsFromCart = async (req: any, res: any) => {
  try {
    const { productIds } = req.body;
   await req.user!.removeProductsFromCart(productIds);
    res
      .status(200)
      .json({ message: "Products removed from cart successfully"  });
  } catch (error) {
    console.error(`Error removing products from cart: ${error}`);
    res.status(500).json({ message: "Error removing products from cart" });
  }
};

 

export { addProductToCart, getCart , removeProductsFromCart};
