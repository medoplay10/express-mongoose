import { User } from "../src/modules/user/models/user.model"; // Adjust the import path accordingly
import {Request} from 'express'
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
