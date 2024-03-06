import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";
import { Package } from "../models/Package";
import { PackageStateHistory } from "../models/PackageStateHistory";
export class packageController {
  constructor() {}

  public createPackage = async (...params) => {
    const [req, res, next] = params;
    try {
      const { description, weight, price, sender_id, receiver_name, receiver_address, receiver_contact_info, reason_id, depot_id, delivery_cost, is_paid } = req.body;
  
      // Create a new package instance
      const newPackage = await Package.create({
        description,
        weight,
        price,
        sender_id:req['currentUser'].id,
        receiver_name,
        receiver_address,
        receiver_contact_info,
        status_id: 1, // Set the status_id to 1
        depot_id,
        delivery_cost,
        is_paid: false
      });
  
      // Create a new package history entry
      const packageHistory = await PackageStateHistory.create({
        package_id: newPackage.package_id, // Assuming package_id is the primary key of the Package model
        state_id: 1, // Set the state_id to 1
        user_id: req['currentUser'].id, // Assuming req.user contains the current user's ID
      });
  
      // Return the newly created package with history
      res.status(201).json({ newPackage, packageHistory });
    } catch (error) {
      console.error('Error creating package:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  public getAllPackagesWithHistory = async (...params) => {
    const [req, res, next] = params;

    try {
      // Find all packages
      const packages = await Package.findAll({
        include: [
          {
            all: true,
            nested: true,
            attributes: { exclude: ["password"] } // Exclude password attribute
          }
        ],
        attributes: { exclude: ["password"] }
      });

      // Fetch history for each package
      for (const pkg of packages) {
        await pkg.fetchPackageHistory(); // Assuming fetchPackageHistory method is defined in the Package model
      }

      // Return packages with their associated history
      res.status(200).json(packages);
    } catch (error) {
      console.error('Error fetching packages with history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}


