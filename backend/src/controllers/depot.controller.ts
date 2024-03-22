import { Request, Response } from 'express';
import { Depot } from '../models/Depot';
import { Op } from "sequelize";

export class depotController {
  // Get all depots
  public getAllDepots = async (...params) => {
    const [req, res, next] = params;
    try {
      // Assuming currentUser and its depot_id are available in the request object
      const currentUserDepotId = req.currentUser.depot_id;
      
      const depots = await Depot.findAll({
        where: {
          depot_id: { [Op.ne]: currentUserDepotId } // Exclude depots with currentUser's depot_id
        },
        include: [{ all: true }]
      });
      
      res.json(depots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Create a new depot
  public createDepot = async (...params) => {
    const [req, res, next] = params;
    try {
      // Implementation to create a new depot
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

 

  // Get depot by ID
  public getDepotById = async (...params) => {
    const [req, res, next] = params;
    try {
      // Implementation to get depot by ID
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
