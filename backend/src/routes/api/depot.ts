import { Router } from 'express';
import auth from '../../middleware/auth';
import { depotController } from '../../controllers/depot.controller';

const router = Router();
const ctrl = new depotController();

// Get all depots
router.get('/', (...params) => ctrl.getAllDepots(...params));

// Create a new depot
router.post('/create', auth, (...params) => ctrl.createDepot(...params));


// Get depot by ID
router.get('/:id', auth, (...params) => ctrl.getDepotById(...params));

export default router;