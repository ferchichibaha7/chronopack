import { Router } from 'express';
import auth from '../../middleware/auth';
import { returnReasonController } from '../../controllers/returnReason.controller';

const router = Router();
const ctrl = new returnReasonController();

// Get all reasons
router.get('/', auth, (...params) => ctrl.getAllReasons(...params));



export default router;