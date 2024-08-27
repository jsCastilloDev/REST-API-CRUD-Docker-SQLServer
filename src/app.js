import express from 'express';
import { getConnection } from './config/db.js';
import cors from "cors";

import procesosRoutes from './routes/procesosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();
console.log(process.env.FRONTEND_URL)
// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      console.log(origin);
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};


app.use(express.json());
app.use(cors(corsOptions));


app.use(procesosRoutes)
app.use(usuariosRoutes)


export default app;