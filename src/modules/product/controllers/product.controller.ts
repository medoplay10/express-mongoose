import { Product } from "../models/product.model";

const addProduct = async (req: any, res: any) => {
  const { title, price, description, imageUrl } = req.body;
  try {
    const product = new Product({
      title,
      price,
      description,
      imageUrl,
      userId: req.user._id,
    });
    console.log(product);
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(`Error adding product: ${error}`);
    res.status(500).json({ message: "Error adding product" });
  }
};

const allProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find().populate("userId");
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const singleProduct = async (req: any, res: any) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const updateProduct = async (req: any, res: any) => {
  try {
    const { productId } = req.params;
    const { title, price, description, imageUrl } = req.body;
    const updateFields: any = {};
    if (title !== undefined) updateFields.title = title;
    if (price !== undefined) updateFields.price = price;
    if (description !== undefined) updateFields.description = description;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    const product = await Product.findByIdAndUpdate(productId, updateFields, {
      new: true, //new: true returns the updated document
      runValidators: true, // runValidators: true runs schema validations
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error updating product: ${error}`);
    res.status(500).json({ message: "Error updating product" });
  }
};
const deleteProduct = async (req: any, res: any) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    console.log(product);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(`Error deleted product: ${error}`);
    res.status(500).json({ message: "Error deleted product" });
  }
};

export { addProduct, allProducts, singleProduct, updateProduct, deleteProduct };
