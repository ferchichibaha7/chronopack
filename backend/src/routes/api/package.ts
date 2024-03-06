import { userController } from '../../controllers/user.controller';
import { Router } from "express";
import { check } from "express-validator/check";

import { packageController } from '../../controllers/package.controller';
import auth from '../../middleware/auth';


const router = Router();
const ctrl = new packageController();


router.get("/", (...params) => ctrl.getAllPackagesWithHistory(...params));
router.post("/create",auth, (...params) => ctrl.createPackage(...params));



export default router;
