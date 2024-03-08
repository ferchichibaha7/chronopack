import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";
import { Package } from "../models/Package";
import { PackageStateHistory } from "../models/PackageStateHistory";
import { Status } from "../models/Status";
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
        depot_id:req['currentUser'].depot_id,
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
      let packages;
  
      // Define a base query object
      const baseQuery: any = {
        include: [
          {
            all: true,
            nested: true,
            attributes: { exclude: ["password"] } // Exclude password attribute
          }
        ],
        attributes: { exclude: ["password"] }
      };
  
      // Check if statusName is passed in the query params
      const statusName = req.query.statusName ? req.query.statusName : null;
  
      // Check the role of the current user and customize the query accordingly
      if (req['currentUser'].role_id === 1) { // Admin
        // Return all packages
        packages = await Package.findAll(baseQuery);
      } else if (req['currentUser'].role_id === 5) { // Fournisseur
        // Return packages where sender_id is the current user's id   
        packages = await Package.findAll({
          ...baseQuery,
          where: { 
            sender_id: req['currentUser'].id,
            ...(statusName && { '$status.statusName$': statusName }) // Conditionally add statusName filter
          } as any,
          include: [
            {
              model: Status,
              where: statusName ? { statusName: statusName } : {} // Conditionally add statusName filter
            }
          ]
        });
      } else if (req['currentUser'].role_id === 2 || req['currentUser'].role_id === 3) { // Magasinier or Manager
        // Return packages where depot_id matches the current user's depot_id
        packages = await Package.findAll({
          ...baseQuery,
          where: { 
            depot_id: req['currentUser'].depot_id,
            ...(statusName && { '$status.statusName$': statusName }) // Conditionally add statusName filter
          } as any,
          include: [
            {
              model: Status,
              where: statusName ? { statusName: statusName } : {} // Conditionally add statusName filter
            }
          ]
        });
      } else if (req['currentUser'].role_id === 4) { // Coursier
        // Return packages where the package history contains the current user's id as coursier_id
        packages = await Package.findAll({
          ...baseQuery,
          include: [
            {
              model: PackageStateHistory,
              where: { coursier_id: req['currentUser'].id } as any
            }
          ]
        });
      }
  
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
  
  



  public async updatePackageState(...params) {
    const [req, res, next] = params;
    const currentUser = req['currentUser'];
    try {
      const { packageId, newStateId } = req.params;

     // Update the state of the package
     const updatedPackage = await Package.findByPk(packageId);
     if  (
      (updatedPackage.status_id !== 1 && updatedPackage.status_id !== 2 && updatedPackage.status_id !== 9) &&
      currentUser.role_id === 5
    ){
      return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Action not allowed" });
    }
     if (!updatedPackage) {
       return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Package not found" });
     }

     // Check if the package sender_id matches the current user's ID
     if (updatedPackage.sender_id !== currentUser.id) {
       return res.status(HttpStatusCodes.FORBIDDEN).json({ error: "Unauthorized action" });
     }

   
     

     // Update the package's state
     updatedPackage.status_id = newStateId;
  // Save the changes to the database
     await updatedPackage.save()
     // Create a new package history entry
     await PackageStateHistory.create({
       package_id: packageId,
       state_id: newStateId,
       user_id: currentUser.id
     });

     // Return the updated package
     res.status(HttpStatusCodes.OK).json({ message: "Package state updated successfully", updatedPackage });
   } catch (error) {
     console.error("Error updating package state:", error);
     res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
   }
 }
}


