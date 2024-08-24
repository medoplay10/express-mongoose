import express, { Express, Request, Response } from "express";

const getLogin = async (req: any, res: any) => {
  try {
    console.log(req.cookies);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(`Error login : ${error}`);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const postLogin = async (req: Request, res: Response) => {
  try {
    // Set cookie and configuration
    res.cookie("isLoggedIn", true,);
    // expires : Expiry date of the cookie
    // maxAge : expiry time of the cookie in milliseconds.
    // domain : Domain name for the cookie like localhost or example.com
    // secure : Only send cookie over https
    // httpOnly : Can't access cookie from javascript , to protect from cross-site scripting attacks

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(`Error login : ${error}`);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export { getLogin, postLogin };
