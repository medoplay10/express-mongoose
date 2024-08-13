import { Order } from "../models/order.model";
import { User } from "../../user/models/user.model";
import { Product } from "../../product/models/product.model";

const userMakeOrder = async (req: any, res: any) => {
  try {
    const user = await req.user!.populate("cart.items.productId");
    console.log(user!.cart!.items);
    if (user!.cart!.items.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
    }
    const order = new Order({
      user: {
        name: req.user!.username,
        userId: req.user!,
      },
      products: user!.cart!.items.map((item: any) => {
        return {
          product: { ...item.productId!._doc },

          quantity: item.quantity,
        };
      }),
    });
    await order.save();
    await req.user!.clearCart();

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(`Error making order: ${error}`);
    res.status(500).json({ message: "Error making order" });
  }
};

export { userMakeOrder };
