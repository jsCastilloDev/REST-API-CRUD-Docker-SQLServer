import { getConnection } from "../config/db.js";
import sql from 'mssql';

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Usuarios');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    const { nombre, email, rol, subgerencia } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('email', sql.NVarChar, email)
            .input('rol', sql.NVarChar, rol)
            .input('subgerencia', sql.NVarChar, subgerencia)
            .query(`INSERT INTO Usuarios (nombre, email, rol, subgerencia) 
                    VALUES (@nombre, @email, @rol, @subgerencia)`);
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};
// Obtener un solo usuario
const getUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Usuarios WHERE usuario_id = @id');
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Error al obtener usuario:', err);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

const updateUsuario = (req, res) => {
    res.send('actualizando usuario con id ');
}

const deleteUsuario = (req, res) => {
    res.send('eliminando usuario con id ');
}

export {getUsuarios, createUsuario, getUsuario, updateUsuario, deleteUsuario};