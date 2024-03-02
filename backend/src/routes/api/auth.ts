import { Router } from "express";
import { check } from "express-validator/check";
import auth from "../../middleware/auth";
import { authController } from '../../controllers/auth.controller';


const router = Router();
const ctrl = new authController();
const validateRegister =   [
  check("name", "Please include a valid alphanumeric username").isAlphanumeric(),
  check( "password",  "Please enter a password with 8 or more characters" ).isLength({ min: 8 })
];
const validateLogin =   [
  check("password", "Password is required").exists()
];


router.post( "/signup",(...params) => ctrl.signup(...params));
router.post( "/login",validateLogin,(...params) => ctrl.login(...params));
router.get("/current",auth,(...params) => ctrl.currentUser(...params) );


export default router;
