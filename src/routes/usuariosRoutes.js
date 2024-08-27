import {Router} from 'express';


import {getUsuarios, createUsuario, getUsuario, updateUsuario, deleteUsuario} from '../controllers/usuariosController.js';

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);


router.post('/usuario', createUsuario);


router.put('/usuarios/:id', updateUsuario);

router.delete('/usuarios/:id', deleteUsuario);

export default router;