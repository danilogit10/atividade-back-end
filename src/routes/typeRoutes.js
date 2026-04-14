import express from 'express';
const router = express.Router();

router.get ('/', (req, res) => {
    res.json({message: 'Rota de tipos funcionando'})
});

export default router;