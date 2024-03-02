import {User} from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Payload from "../types/Payload";
import _ from "underscore";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export class authController {
  constructor() {}

  public currentUser = async (...params) => {
    const [req, res, next] = params;

    try {
      let user   = req.currentUser
      console.log(user);
      
      res.json({ message: "User retrieved", result: user  })
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  
  };

  public async signup(...params) {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }
  
      // Extract user data from request body
      const { username, email, password, roleId,depotId } = req.body;
  
      // Check for existing user with the same username or email
      const existingUser = await User.findOne({
        where: { username: username } as any
      });
      if (existingUser) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            existingUser.username === username ? { msg: "Username already in use" } : null,
            existingUser.email === email ? { msg: "Email already in use" } : null,
          ].filter(Boolean), // Remove null elements
        });
      }
  
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create a new user with default inactive status
      const newUser =   await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role_id: roleId,
        depot_id: depotId,
        // Add other properties here if needed
      });
  
      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "User registered successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  }


  public login = async (...params) => {
    const [req, res, next] = params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      let user = {};
          user = await User.findOne({ where:{ username : username } as any});
      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }
      const isMatch = bcrypt.compareSync(password, user['password']);

      if (!isMatch) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }

      const payload: Payload = {
        id: user['id']
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: process.env.jwtExpiration },
        (err, token) => {
          if (err) throw err;
          let toret = {"token":token}
          res.json(toret);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  
  };
  
}
