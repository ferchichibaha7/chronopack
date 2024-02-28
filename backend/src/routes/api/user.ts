import { userController } from '../../controllers/user.controller';
import { Router } from "express";
import { check } from "express-validator/check";
import auth from '../../middleware/auth';


const router = Router();
const ctrl = new userController();
const validateOptions =   [
  check("name", "Please include a valid alphanumeric username").isAlphanumeric(),
  check( "password",  "Please enter a password with 8 or more characters" ).isLength({ min: 8 })
];

router.get( "/list",auth,(...params) => ctrl.findAllUsers(...params));
router.delete( "/delete/:id",auth,(...params) => ctrl.deleteUser(...params));
router.get( "/:id",auth,(...params) => ctrl.findOneUser(...params));
router.put( "/:id",auth,validateOptions,(...params) => ctrl.updateUser(...params));


export default router;
