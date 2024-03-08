import { userController } from '../../controllers/user.controller';
import { Router } from "express";
import { check } from "express-validator/check";

import { packageController } from '../../controllers/package.controller';
import auth from '../../middleware/auth';


const router = Router();
const ctrl = new packageController();


router.get("/",auth, (...params) => ctrl.getAllPackagesWithHistory(...params));
router.post("/create",auth, (...params) => ctrl.createPackage(...params));
router.put("/:packageId/state/:newStateId",auth, (...params) => ctrl.updatePackageState(...params));



export default router;
