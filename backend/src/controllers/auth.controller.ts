import {User} from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Payload from "../types/Payload";
import _ from "underscore";
import jwt from "jsonwebtoken";
import { Role } from "../models/Role";

export class authController {
  constructor() {}

  public currentUser = async (...params) => {
    const [req, res, next] = params;

    try {
      let user   = req.currentUser
      res.json({ message: "User retrieved", result: user  })
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  
  };

  public async signup(...params) {
    const [req, res, next] = params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const {
      name,
      password
    } = req.body;
    try {
     
        let user = await User.findOne({ where: { name: name } });
        if (user) {
          return res.status(HttpStatusCodes.BAD_REQUEST).json({
            errors: [
              {
                msg: "name already used",
              },
            ],
          });
     
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      await User.create({
        name: name,
        password: hashed,
        role_id:2 // Normal User
      });
      res.json({ message: "User Registered" });
    } catch (err) {

      console.log(err);
      
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
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

    const { name, password } = req.body;
    try {
      let user = {};
          user = await User.findOne({ where:{ name : name }});
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
