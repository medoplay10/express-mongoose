// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./util/database";
import { productRoute } from "../src/modules/product/routes/product.route";
import { userRoute } from "../src/modules/user/routes/user.route";
import { orderRoute } from "../src/modules/order/routes/order.route";
import { authRoute } from "./modules/auth/routes/auth.route";
import { User } from "../src/modules/user/models/user.model";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse application/json
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("66bb4cbd60a7d6cd8aef6ea9");
    // req.isLoggedIn = true;
    req.user = new User({
      _id: user!._id,
      username: user!.username,
      email: user!.email,
      cart: user!.cart,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

connectDb()
  .then(async () => {
    const userFindOne = await User.findOne();
    if (!userFindOne) {
      const user = new User({
        username: "admin",
        email: "admin@localhost",
        cart: { items: [] },
      });
      await user.save();
    }

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
