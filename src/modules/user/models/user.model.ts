import mongoose, { Schema } from "mongoose";
import { Product } from "../../product/models/product.model";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
  },
});
userSchema.methods.addToCart = async function (
  product: typeof Product.prototype,
  quantity: number
) {
  try {
    const cartProductIndex = this.cart.items.findIndex((item: any) => {
      return item.productId.toString() === product._id!.toString();
    });
    const updateCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      updateCartItems[cartProductIndex].quantity += quantity;
    } else {
      updateCartItems.push({ productId: product, quantity });
    }

    const userId = this._id;
    return await User.findByIdAndUpdate(
      userId,
      {
        cart: { items: updateCartItems },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

userSchema.methods.removeProductsFromCart = async function (
  productIds: string[]
) {
  try {
    // Filter out the items whose productId is not in the provided productIds
    const updatedCartItems = this.cart.items.filter((item: any) => {
      return !productIds.includes(item.productId.toString());
    });

    // If no items were removed, return early
    if (updatedCartItems.length === this.cart.items.length) {
      throw new Error("No matching products found in the cart");
    }

    // Update the cart with the filtered items
    this.cart.items = updatedCartItems;

    const userId = this._id;
    return await User.findByIdAndUpdate(
      userId,
      { cart: { items: updatedCartItems } },
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw error;
  }
};

userSchema.methods.clearCart = async function () {
  try {
    const userId = this._id;
    return await User.findByIdAndUpdate(
      userId,
      { cart: { items: [] } },
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model("User", userSchema);
