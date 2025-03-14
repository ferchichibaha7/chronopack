import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import Payload from "../types/Payload";
import { Role } from "../models/Role";
import { Depot } from "../models/Depot";

export default async function(req, res, next) {
  try {
  // Get token from header
  const token = req.headers.authorization.split(" ")[1];
  // Verify token
    const payload: Payload | any = jwt.verify(token, process.env.SECRET);
    let user = await User.findOne({
      where: { id: payload.id } as any,
      attributes: { exclude: ['password'] },
      include: [
        { model: Role },
        { model: Depot }
      ]
    });
    if (user && !user['active']) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "Account disabled"
          }
        ]
      });
    }
    req.currentUser = user
    next();
  } catch (err) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
   
}
