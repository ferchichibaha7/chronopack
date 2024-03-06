import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";
export class userController {
  constructor() {}

  public getAllAdmins = async (...params) => {
    const [req, res, next] = params;
    try {
      const admins = await User.findAll({
        where: { role_id: 1 } as any, // Assuming role_id 1 represents the admin role
        include: [{ all: true }],
        attributes: { exclude: ["password"] }
      });
      res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public getAllManager = async (...params) => {
    const [req, res, next] = params;
    try {
      const manager = await User.findAll({
        where: { role_id: 2 } as any, // Assuming role_id 2 represents the manager role
        include: [{ all: true }],
        attributes: { exclude: ["password"] }
      });
      res.json(manager);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public getAllMagasinier = async (...params) => {
    const [req, res, next] = params;
    try {
      const magasinier = await User.findAll({
        where: { role_id: 3 } as any, // Assuming role_id 3 represents the magasinier role
        include: [{ all: true }],
        attributes: { exclude: ["password"] }
      });
      res.json(magasinier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public getAllCoursier = async (...params) => {
    const [req, res, next] = params;
    try {
      const coursier = await User.findAll({
        where: { role_id: 4 } as any, // Assuming role_id 4 represents the coursier role
        include: [{ all: true }],
        attributes: { exclude: ["password"] }
      });
      res.json(coursier);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public getAllFournisseur = async (...params) => {
    const [req, res, next] = params;
    try {
      const fournisseur = await User.findAll({
        where: { role_id: 5 } as any, // Assuming role_id 5 represents the fournisseur role
        include: [{ all: true }],
        attributes: { exclude: ["password"] }
      });
      res.json(fournisseur);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  /*
  public updateUser = (...params) => {
    const [req, res, next] = params;
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    const {
      username,
      password
  
    } = req.body;
    User.findOne({
      where: {
        [Op.or]: [{ username: username }, { id: id }],
      },
    })
      .then(async (user) => {
        if (!user || user["id"] == id) {
          let passtosend = password;
         
            const salt = await bcrypt.genSalt(10);
            passtosend = await bcrypt.hash(password, salt);
       
       
            res.json({ message: `User `, result: 'User' });
       
        }
      })
      .catch(() => {
        res.status(500).send({ error: "name already used" });
      });
  };
*/

  /*
  public findAllUsers = (...params) => {
    const [req, res, next] = params;

    User.findAll({
      attributes: { exclude: ["password"] },
    }).then((users) => {
      res.json({ message: "Users retrieved", result: users });
    });
  };

  public findOneUser = (...params) => {
    const [req, res, next] = params;
    const { id } = req.params;
    User.findOne({ where: { id: id } }).then((user) =>
      res.json({ message: "User retrieved", result: user })
    );
  };
*/

  /*
  public deleteUser = (...params) => {
    const [req, res, next] = params;
    const { id } = req.params;
    User.destroy({ where: { id: id } }).then(() => {
      res.json({ message: `User ${id} deleted` });
    });
  };
  */
}
