import { userController } from '../../controllers/user.controller';
import { Router } from "express";
import { check } from "express-validator/check";

import { packageController } from '../../controllers/package.controller';
import auth from '../../middleware/auth';


const router = Router();
const ctrl = new packageController();


// Get all packages with history
router.get("/", auth, (...params) => ctrl.getAllPackagesWithHistory(...params));

// Create a new package
router.post("/create", auth, (...params) => ctrl.createPackage(...params));

// Update package state
router.put("/:packageId/state/:newStateId", auth, (...params) => ctrl.updatePackageState(...params));

// Get package by ID
router.get("/:id", auth, (...params) => ctrl.getPackageById(...params));



export default router;
