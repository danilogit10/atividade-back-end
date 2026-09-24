    import express from 'express';
    import cors from 'cors';

    import plantRoutes from './src/routes/PlantRoutes.js';
    import typeRoutes from './src/routes/typeRoutes.js';
    import userRoutes from './src/routes/userRoutes.js';
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/plants', plantRoutes);
    app.use('/types', typeRoutes);
    app.use('/users', userRoutes);

    export default app;