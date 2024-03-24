import { Request, Response } from 'express';
import { Op } from "sequelize";
import { ReturnReason } from '../models/ReturnReason';

export class returnReasonController {
  // Get all reasons
  public getAllReasons = async (...params) => {
    const [req, res, next] = params;
    try {
      
      const reasons = await ReturnReason.findAll();
      
      res.json(reasons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

}
