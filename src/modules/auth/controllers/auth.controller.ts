import express, { Express, Request, Response } from "express";
import { User } from "../../user/models/user.model";

const getLogin = async (req: any, res: any) => {
  try {
    console.log(req.session);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(`Error login : ${error}`);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const postLogin = async (req: any, res: any) => {
  try {
    const user = await User.findById("66bb4cbd60a7d6cd8aef6ea9");
    req.session.isLoggedIn = true;
    req.session.user = new User({
      _id: user!._id,
      username: user!.username,
      email: user!.email,
      cart: user!.cart,
    });
    req.session.save((err: any) => {
      console.log(err);
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

const logout = async (req: Request, res: any) => {
  try {
    req.session.destroy((err: any) => {
      console.log("session destroyed", err);
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(`Error logout: ${error}`);
    res.status(500).json({ message: "Error " });
  }
};

export { getLogin, postLogin, logout };
