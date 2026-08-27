import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
