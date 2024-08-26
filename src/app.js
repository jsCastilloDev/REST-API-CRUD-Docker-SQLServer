import express from 'express';
import { getConnection } from './config/db.js';

import procesosRoutes from './routes/procesosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
app.use(express.json());

app.use(procesosRoutes)
app.use(usuariosRoutes)


export default app;