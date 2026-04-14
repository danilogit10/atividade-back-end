import express from 'express';
import cors from 'cors';

import plantRoutes from './src/routes/plantRoutes.js';
import typeRoutes from './src/routes/typeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/plants', plantRoutes);
app.use('/type', typeRoutes);

export default app;