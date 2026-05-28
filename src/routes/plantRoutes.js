import express from 'express';
import plantController from '../controller/plantController.js';

const router = express.Router();

router.get('/', plantController.getAll);

router.post('/', plantController.create);

router.delete('/:id', plantController.remove);

export default router;