
import { getConnection } from "../config/db.js";
import sql from 'mssql';
const getProcesos =  async (req, res) => {
    const connection = await getConnection();

    const result = await connection.query('SELECT * FROM procesos');
    res.json(result.recordset);

    
};

// Crear un nuevo proceso
const createProceso = async (req, res) => {
    const { nombre, propietario_id, estado_actual } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('estado_actual', sql.NVarChar, estado_actual || null)
            .query(`INSERT INTO Procesos (nombre, estado_actual) 
                    VALUES (@nombre, @estado_actual)`);
        res.status(201).json({ message: 'Proceso creado exitosamente' });
    } catch (err) {
        console.error('Error al crear el proceso:', err);
        res.status(500).json({ error: 'Error al crear el proceso' });
    }
};


const getProceso = async (req, res) => {
    try {
        console.log(req.params.id);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Procesos WHERE proceso_id = @id');
        console.log(result);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener el proceso:', err);
        res.status(500).json({ error: 'Error al obtener el proceso' });
    }
}


const updateProceso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado_actual, propietario_id } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('estado_actual', sql.NVarChar, estado_actual || null)
            .input('propietario_id', sql.Int, propietario_id || null)
            .input('id', sql.Int, id)
            .query(`UPDATE Procesos 
                    SET nombre = @nombre, 
                        estado_actual = @estado_actual, 
                        propietario_id = @propietario_id 
                    WHERE proceso_id = @id`);
        
        res.json({ message: 'Proceso actualizado exitosamente' });
        console.log(result);
    } catch (err) {
        console.error('Error al actualizar el proceso:', err);
        res.status(500).json({ error: 'Error al actualizar el proceso' });
    }
};



const deleteProceso = (req, res) => {
    res.send('eliminando proceso con id ');
}   


export {getProcesos, createProceso, getProceso, updateProceso, deleteProceso};
