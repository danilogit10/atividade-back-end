import express from 'express';
import typeController from "../controller/typeController.js"

const router = express.Router();

router.get ('/', typeController.getAll);
router.post('/', typeController.create);
router.delete('/:id', typeController.remove)

export default router;