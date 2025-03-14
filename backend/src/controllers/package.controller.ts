import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";
import { Package } from "../models/Package";
import { PackageStateHistory } from "../models/PackageStateHistory";
import { Status } from "../models/Status";
import { Sequelize } from "sequelize-typescript";
export class packageController {
  constructor() {}

  public createPackage = async (...params) => {
    const [req, res, next] = params;
    try {
      const {
        description,
        weight,
        price,
        sender_id,
        receiver_name,
        receiver_address,
        receiver_contact_info,
        reason_id,
        depot_id,
        delivery_cost,
        is_paid,
      } = req.body;

      // Create a new package instance
      const newPackage = await Package.create({
        description,
        weight,
        price,
        sender_id: req["currentUser"].id,
        receiver_name,
        receiver_address,
        receiver_contact_info,
        status_id: 1, // Set the status_id to 1
        depot_id: req["currentUser"].depot_id,
        delivery_cost,
        is_paid: false,
      });

      // Create a new package history entry
      const packageHistory = await PackageStateHistory.create({
        package_id: newPackage.package_id, // Assuming package_id is the primary key of the Package model
        state_id: 1, // Set the state_id to 1
        user_id: req["currentUser"].id, // Assuming req.user contains the current user's ID
      });

      // Return the newly created package with history
      res.status(201).json({ newPackage, packageHistory });
    } catch (error) {
      console.error("Error creating package:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public getPackageById = async (...params) => {
    const [req, res, next] = params;
    try {
      const packageId = req.params.id;

      // Define a base query object
      const baseQuery = {
        include: [
          {
            all: true,
            nested: true,
            attributes: { exclude: ["password"] }, // Exclude password attribute
          },
        ],
        attributes: { exclude: ["password"] },
      };

      let queryCondition = {};

      // Check the role of the current user and customize the query condition accordingly
      if (req["currentUser"].role_id === 5) {
        // Fournisseur
        // Return packages where sender_id is the current user's id
        queryCondition = {
          sender_id: req["currentUser"].id,
        };
      } else if (
        req["currentUser"].role_id === 2 ||
        req["currentUser"].role_id === 3
      ) {


        // Magasinier or Manager
        // Return packages where depot_id matches the current user's depot_id
        queryCondition = {
          [Op.or]: [
           // { depot_id: req["currentUser"].depot_id }, // Depot ID matches current user's depot_id
          ],
        };
      }

      // Find the package by ID and condition
      const foundPackage = await Package.findOne({
        ...baseQuery,
        where: {
          package_id: packageId
       
        },
      });

      // If package is not found or conditions are not met, return 404
      if (!foundPackage) {
        return res
          .status(404)
          .json({ error: "Package not found or unauthorized" });
      }

      // Fetch history for the package
      await foundPackage.fetchPackageHistory();

      // Return the package with its associated history
      res.status(200).json(foundPackage);
    } catch (error) {
      console.error("Error fetching package by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public getPackagesByStateCount = async (...params) => {
    const [req, res, next] = params;
    try {
      let packageCounts = {};
      const statusName = req.query.statusName ? req.query.statusName : null;
      const baseQuery: any = {
        all: true,
        nested: true,
        attributes: { exclude: ["password"] }, // Exclude password attribute
      };
      // Fetch all packages with their associated statuses
      let packages;
      if (req["currentUser"].role_id === 1) {
        // Admin
        packages = await Package.findAll({ include: [{ model: Status }] });
      } else if (req["currentUser"].role_id === 5) {
        // Fournisseur
        packages = await Package.findAll({
          where: { sender_id: req["currentUser"].id },
          include: [{ model: Status }],
        });
      } else if (
        req["currentUser"].role_id === 2 ||
        req["currentUser"].role_id === 3
      ) {
        const packageIdQuery = `SELECT "depot_id" FROM "PackageStateHistories" WHERE "package_id" = "Package"."package_id" ORDER BY "createdAt" DESC LIMIT 1`;

        const depotCondition = {
          [Op.or]: [
            { depot_id: req["currentUser"].depot_id }, // Depot ID matches current user's depot_id
            Sequelize.literal(`(${packageIdQuery}) = ${req["currentUser"].depot_id}`), // Package history depot ID matches current user's depot_id
          ],
        };
  
        packages = await Package.findAll({
          where: {
            ...(statusName && { '$status.statusName$': statusName }), // Conditionally add statusName filter
            ...depotCondition, // Include the depot condition
          } as any,
          include: [
            {
              model: Status,
              where: statusName ? { statusName: statusName } : {}, // Conditionally add statusName filter
            },
            baseQuery,
          ],
        });
      } else if (req["currentUser"].role_id === 4) {
        // Coursier
      
        const packageIdQuery = `SELECT "coursier_id" FROM "PackageStateHistories" WHERE "package_id" = "Package"."package_id" ORDER BY "createdAt" DESC LIMIT 1`;
        
      const depotCondition = {
        [Op.and]: [
          { depot_id: req["currentUser"].depot_id }, // Depot ID matches current user's depot_id
          Sequelize.literal(`(${packageIdQuery}) = ${req["currentUser"].id}`), // Package history depot ID matches current user's depot_id
        ],
      };
        packages = await Package.findAll({
          where: {
            ...(statusName && { "$status.statusName$": statusName }), // Conditionally add statusName filter
          ...depotCondition, // Include the depot condition
          } as any,
          include: [
            {
              model: Status,
              where: statusName ? { statusName: statusName } : {}, // Conditionally add statusName filter
            },
            baseQuery,
          ],
        });
      }
  
      // Count packages for each state
      packages.forEach((pkg) => {
        const statusName = pkg.status?.statusName;
        if (statusName) {
          packageCounts[statusName] = packageCounts[statusName] ? packageCounts[statusName] + 1 : 1;
        }
      });
  
      // Return the package counts for each state
      res.status(200).json(packageCounts);
    } catch (error) {
      console.error("Error fetching package counts by state:", error);
      res.status(500).json({ error: "Internal server error" });
    }

    
  };
  

  public getAllPackagesWithHistory = async (...params) => {
    const [req, res, next] = params;
    try {
      let packages;

      // Define a base query object
      const baseQuery: any = {
        all: true,
        nested: true,
        attributes: { exclude: ["password"] }, // Exclude password attribute
      };

      // Check if statusName is passed in the query params
      const statusName = req.query.statusName ? req.query.statusName : null;
      
      // Check the role of the current user and customize the query accordingly
      if (req["currentUser"].role_id === 1) {
        // Admin
        // Return all packages
        packages = await Package.findAll({
          include: [ baseQuery],
        });
      } else if (req["currentUser"].role_id === 5) {
        // Fournisseur
        // Return packages where sender_id is the current user's id
        packages = await Package.findAll({
          where: {
            sender_id: req["currentUser"].id,
            ...(statusName && { "$status.statusName$": statusName }), // Conditionally add statusName filter
          } as any,
          include: [
            {
              model: Status,
              where: statusName ? { statusName: statusName } : {}, // Conditionally add statusName filter
            },
            baseQuery,
          ],
        });
      } else if (
        req["currentUser"].role_id === 2 ||
        req["currentUser"].role_id === 3
      ) {
        // Magasinier or Manager
        // Return packages where depot_id matches the current user's depot_id

        const packageIdQuery = `SELECT "depot_id" FROM "PackageStateHistories" WHERE "package_id" = "Package"."package_id" ORDER BY "createdAt" DESC LIMIT 1`;

      const depotCondition = {
        [Op.or]: [
          { depot_id: req["currentUser"].depot_id }, // Depot ID matches current user's depot_id
          Sequelize.literal(`(${packageIdQuery}) = ${req["currentUser"].depot_id}`), // Package history depot ID matches current user's depot_id
        ],
      };
        packages = await Package.findAll({
          where: {
            "$status.statusName$": { [Op.not]: 'Brouillon' }, // Exclude packages with statusName 'Brouillon'
            ...(statusName && { "$status.statusName$": statusName }), // Conditionally add statusName filter
          ...depotCondition, // Include the depot condition
          } as any,
          include: [
            {
              model: Status,
              where: statusName ? { statusName: statusName } : {}, // Conditionally add statusName filter
            },
            baseQuery,
          ],
        });
      } else if (req["currentUser"].role_id === 4) {
    
        const packageIdQuery = `SELECT "coursier_id" FROM "PackageStateHistories" WHERE "package_id" = "Package"."package_id" ORDER BY "createdAt" DESC LIMIT 1`;
        
      const depotCondition = {
        [Op.and]: [
          { depot_id: req["currentUser"].depot_id }, // Depot ID matches current user's depot_id
          Sequelize.literal(`(${packageIdQuery}) = ${req["currentUser"].id}`), // Package history depot ID matches current user's depot_id
        ],
      };
        packages = await Package.findAll({
          where: {
            ...(statusName && { "$status.statusName$": statusName }), // Conditionally add statusName filter
          ...depotCondition, // Include the depot condition
          } as any,
          include: [
            {
              model: Status,
              where: statusName ? { statusName: statusName } : {}, // Conditionally add statusName filter
            },
            baseQuery,
          ],
        });
      }

      // Fetch history for each package
      for (const pkg of packages) {
        await pkg.fetchPackageHistory(); // Assuming fetchPackageHistory method is defined in the Package model
      }

      // Return packages with their associated history
      res.status(200).json(packages);
    } catch (error) {
      console.error("Error fetching packages with history:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  public async updatePackageStates(req, res, next) {
    const currentUser = req["currentUser"];
    const { packageIds, newStateId,coursier_id,depot_id,reason_id } = req.body; // Assuming you send packageIds and newStateId in the request body
  
    try {
      // Loop through each package ID and update its state
      for (const packageId of packageIds) {
        // Update the state of the package
        const updatedPackage = await Package.findByPk(packageId);
        if (!updatedPackage) {
          return res.status(HttpStatusCodes.NOT_FOUND).json({ error: `Package with ID ${packageId} not found` });
        }
  
        // Add your state validation logic here (switch statement, role checks, etc.)
  
        // Update the package's state
        updatedPackage.status_id = newStateId;
        if(newStateId == 4){
          updatedPackage.depot_id = currentUser.depot_id;

        }
  
        // Save the changes to the database
        await updatedPackage.save();
  
        const packageStateHistoryData = {
          package_id: packageId,
          state_id: newStateId,
          user_id: currentUser.id,
        };
  
        // Determine reasonId and depotId based on your logic
        if (currentUser.role_id == 5 && newStateId == 7) {
          const reasonId = 4; // Determine the reason ID based on your logic
          packageStateHistoryData['reason_id'] = reasonId;
        }
        if (currentUser.role_id == 4 && newStateId == 7) {
          packageStateHistoryData['reason_id'] = reason_id;
          packageStateHistoryData['coursier_id'] = coursier_id;

        }
        if (currentUser.role_id == 4 && (newStateId == 6)) {
          packageStateHistoryData['coursier_id'] = coursier_id;

        }
           // Determine reasonId and depotId based on your logic
           if ( (currentUser.role_id == 2 || currentUser.role_id == 3 ) && (newStateId == 5 || newStateId ==  8)  && coursier_id) {
            packageStateHistoryData['coursier_id'] = coursier_id;
          }

          

            // Determine reasonId and depotId based on your logic
            if ( (currentUser.role_id == 2 || currentUser.role_id == 3 ) && newStateId == 3 && depot_id) {
              packageStateHistoryData['depot_id'] = depot_id;
            }
  
        if ( newStateId == 4) {
          const depotId = currentUser.depot_id;
          packageStateHistoryData['depot_id'] = depotId;
        }
       
        // Create a new package history entry
        await PackageStateHistory.create(packageStateHistoryData);
      }
  
      // Return success response
      res.status(HttpStatusCodes.OK).json({ message: "Package states updated successfully" });
    } catch (error) {
      console.error("Error updating package states:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }



  public async updatePackages(req, res, next) {
    const currentUser = req["currentUser"];
    const { packageUpdates } = req.body; // Assuming packageUpdates is an array of objects with packageId and newData

    // Ensure the user is an admin
    if (!currentUser || currentUser.role_id !== 1) {
        return res.status(HttpStatusCodes.FORBIDDEN).json({ error: "Unauthorized access" });
    }

    try {
        for (const update of packageUpdates) {
            const { packageId, newData } = update;
            
            // Find the package by ID
            const pack = await Package.findByPk(packageId);
            if (!pack) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({ error: `Package with ID ${packageId} not found` });
            }

            // Update the package with new data
            Object.assign(pack, newData);

            // Save the changes to the database
            await pack.save();
  
            // Create a package state history entry
            const packageStateHistoryData = {
                package_id: packageId,
                state_id: pack.status_id, // Assuming status_id is part of the updates
                user_id: currentUser.id, // Admin user who made the change
            };

            // Add optional fields to packageStateHistoryData if they exist in newData
            if (newData.depot_id) {
                packageStateHistoryData['depot_id'] = newData.depot_id;
            }
            if (newData.coursier_id) {
                packageStateHistoryData['coursier_id'] = newData.coursier_id;
            }
            if (newData.reason_id) {
                packageStateHistoryData['reason_id'] = newData.reason_id;
            }

            // Create a new package history entry
            await PackageStateHistory.create(packageStateHistoryData);
        }

        // Return success response
        res.status(HttpStatusCodes.OK).json({ message: "Packages updated successfully" });
    } catch (error) {
        console.error("Error updating packages:", error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}


  public getPackageStatusChartDataa = async (...params) => {
    const [req, res, next] = params;
  
    try {
      // Fetch the count of packages for each status and date
      const packageCounts = await Package.findAll({
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('Package.createdAt')), 'day'],
          [Sequelize.fn('COUNT', Sequelize.col('*')), 'packageCount'],
          [Sequelize.col('status.id'), 'status.id'],
          [Sequelize.col('status.statusName'), 'statusName'], // Include statusName directly in the attributes
        ],
        include: [{ model: Status, attributes: [] }],
        group: [
          Sequelize.fn('DATE', Sequelize.col('Package.createdAt')),
          Sequelize.col('status.id'),
          Sequelize.col('status.statusName'),
        ],
      });
  
      // Process the fetched data to format it for the chart
      const chartData = {
        series: [],
        categories: [],
        statusNames: [], // Include statusNames array to store unique status names
        statusColors: {}, // Include statusColors object to store status colors
      };
  
      // Populate categories (dates) in the chartData
      packageCounts.forEach((item: any) => {
        const day = item.getDataValue('day'); // Assuming day is already a string in 'YYYY-MM-DD' format
        if (day && !chartData.categories.includes(day)) {
          chartData.categories.push(day);
        }
      });
  
      // Extract unique status names and populate statusNames array
      const uniqueStatusNames = Array.from(new Set(packageCounts.map((item: any) => item.getDataValue('statusName'))));
      chartData.statusNames = uniqueStatusNames;
  
      // Define status colors based on status names
      const statusColorMap = {
        'Brouillon': '#FFC107',  // Yellow color for status "Brouillon"
        'En attente de ramassage': '#FFBA43',  // Orange color for status "En attente de ramassage"
        'En transit': '#6B21A8',  // Green color for status "En transit"
        'En stock': '#2196F3',  // Blue color for status "En stock"
        'En cours de livraison': '#9C27B0',  // Purple color for status "En cours de livraison"
        'Livré': '#4CAF50',  // Green color for status "Livré"
        'Retourné': '#F44336',  // Red color for status "Retourné"
        'Livré et payé': '#4CAF50',  // Green color for status "Livré et payé"
        'Annulé': '#F44336',  // Red color for status "Annulé"
        'Pickup': '#2196F3',  // Blue color for status "Pickup"
      };
  
      // Populate series data for each status
      uniqueStatusNames.forEach((statusName: string) => {
        const statusSeries = {
          name: statusName,
          data: new Array(chartData.categories.length).fill(0), // Initialize data array with zeros
          color: statusColorMap[statusName] || '#000000', // Default color if status name is not found in the map
        };
        packageCounts.forEach((item: any) => {
          const day = item.getDataValue('day');
          const packageCount = item.getDataValue('packageCount');
          if (day && item.getDataValue('statusName') === statusName) {
            const index = chartData.categories.indexOf(day);
            if (index !== -1) {
              statusSeries.data[index] = packageCount;
            }
          }
        });
        chartData.series.push(statusSeries);
      });
  
      // Return the formatted chart data
      res.status(200).json(chartData);
    } catch (error) {
      console.error("Error fetching package status chart data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  
  
  
}
