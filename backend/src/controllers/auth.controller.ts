import {User} from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Payload from "../types/Payload";
import _ from "underscore";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
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



  

  public createAdmin = async (...params) => {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      // Extract user data from request body
      const { username, email, password, depotId } = req.body;

      // Check for existing user with the same username or email
      const existingUser = await User.findOne({
        where: { username: username } as any
      });
      if (existingUser) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            existingUser.username === username ? { msg: "Username already in use" } : null,
            existingUser.email === email ? { msg: "Email already in use" } : null,
          ].filter(Boolean),
        });
      }
      const adminRole = await Role.findOne({ where: { role_name: 'Administrateur' } as any });
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin user
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role_id: adminRole.role_id, // Assuming 'admin' is the role ID for admin users
        // Add other properties here if needed
      });

      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "Admin user created successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  };

  public createManager = async (...params) => {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      // Extract user data from request body
      const { username, email, password, depotId } = req.body;

      // Check for existing user with the same username or email
      const existingUser = await User.findOne({
        where: { username: username } as any
      });
      if (existingUser) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            existingUser.username === username ? { msg: "Username already in use" } : null,
            existingUser.email === email ? { msg: "Email already in use" } : null,
          ].filter(Boolean),
        });
      }
      const adminRole = await Role.findOne({ where: { role_name: 'Manager' } as any });
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin user
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role_id: adminRole.role_id,
        depot_id:depotId
      });

      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "Manager user created successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  };

  public createMagasinier = async (...params) => {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      // Extract user data from request body
      const { username, email, password, depotId } = req.body;

      // Check for existing user with the same username or email
      const existingUser = await User.findOne({
        where: { username: username } as any
      });
      if (existingUser) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            existingUser.username === username ? { msg: "Username already in use" } : null,
          ].filter(Boolean),
        });
      }
      const adminRole = await Role.findOne({ where: { role_name: 'Magasinier' } as any });
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin user
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role_id: adminRole.role_id,
        depot_id:depotId
      });

      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "Magasinier user created successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  };

  public createCoursier = async (...params) => {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      // Extract user data from request body
      const { username, email, password, depotId } = req.body;

      // Check for existing user with the same username or email
      const existingUser = await User.findOne({
        where: { username: username } as any
      });
      if (existingUser) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            existingUser.username === username ? { msg: "Username already in use" } : null,
          ].filter(Boolean),
        });
      }
      const adminRole = await Role.findOne({ where: { role_name: 'Coursier' } as any });
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin user
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role_id: adminRole.role_id,
        depot_id:depotId
      });

      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "Coursier user created successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  };

  public createFournisseur = async (...params) => {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      // Extract user data from request body
      const { username, email, password, depotId } = req.body;

      // Check for existing user with the same username or email
      const existingUser = await User.findOne({
        where: { username: username } as any
      });
      if (existingUser) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            existingUser.username === username ? { msg: "Username already in use" } : null,
          ].filter(Boolean),
        });
      }
      const adminRole = await Role.findOne({ where: { role_name: 'Fournisseur' } as any });
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin user
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role_id: adminRole.role_id,
        depot_id:depotId
      });

      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "Fournisseur user created successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  };

  public register = async (...params) => {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      // Extract user data from request body
      const { username, email, password, depotId } = req.body;

      // Check for existing user with the same username or email
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: username },
            { email: email },
          ],
        },
      });
  
      if (existingUser) {
        const errorMessages = [];
        if (existingUser.username === username) {
          errorMessages.push({ msg: "Username already in use" });
        }
        if (existingUser.email === email) {
          errorMessages.push({ msg: "Email already registered" });
        }
  
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errorMessages });
      }
      const adminRole = await Role.findOne({ where: { role_name: 'Fournisseur' } as any });
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new admin user
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role_id: adminRole.role_id,
        depot_id:depotId,
        active:false
      });

      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "Fournisseur user created successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  };

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
      if (user && !user['active']) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Account disabled"
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
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  
  };
  
}
