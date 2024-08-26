import {Router} from 'express';

import {getProcesos, createProceso, getProceso, updateProceso, deleteProceso} from '../controllers/procesosController.js';

const router = Router();

router.get('/Procesos', getProcesos);

router.get('/Procesos/:id', getProceso);

router.post('/Procesos', createProceso);


router.put('/Procesos/:id', updateProceso);

router.delete('/Procesos/:id', deleteProceso);

export default router;