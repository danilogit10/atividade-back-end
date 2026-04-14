import express from 'express';
const router = express.Router();

router.get ('/', (req, res) => {
    res.json({message: 'Rota de plantas funcionando'})
});

export default router;