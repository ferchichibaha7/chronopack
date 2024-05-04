import { userController } from '../../controllers/user.controller';
import { Router } from "express";
import { check } from "express-validator/check";
import auth from '../../middleware/auth';
import roleAuthorization from '../../middleware/roleAuthorization';


const router = Router();
const ctrl = new userController();
const validateOptions =   [
  check("name", "Please include a valid alphanumeric username").isAlphanumeric(),
  check( "password",  "Please enter a password with 8 or more characters" ).isLength({ min: 8 })
];

router.get( "/administrateur",auth,roleAuthorization(['Administrateur']),(...params) => ctrl.getAllAdmins(...params));
router.get( "/manager",auth,roleAuthorization(['Administrateur']),(...params) => ctrl.getAllManager(...params));
router.get( "/magasinier",auth,roleAuthorization(['Administrateur']),(...params) => ctrl.getAllMagasinier(...params));
router.get( "/coursier",auth,roleAuthorization(['Administrateur','Manager','Magasinier']),(...params) => ctrl.getAllCoursier(...params));
router.get( "/fournisseur",auth,roleAuthorization(['Administrateur']),(...params) => ctrl.getAllFournisseur(...params));
router.put("/toggleactive", auth,roleAuthorization(['Administrateur']),(...params) => ctrl.toggleActive(...params));


//router.get( "/list",auth,(...params) => ctrl.findAllUsers(...params));
//router.delete( "/delete/:id",auth,(...params) => ctrl.deleteUser(...params));
//router.get( "/:id",auth,(...params) => ctrl.findOneUser(...params));
//router.put( "/:id",auth,validateOptions,(...params) => ctrl.updateUser(...params));


export default router;
