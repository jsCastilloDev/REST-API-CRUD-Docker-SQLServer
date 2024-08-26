
import { getConnection } from "../config/db.js";
import sql from 'mssql';
const getProcesos =  async (req, res) => {
    const connection = await getConnection();

    const result = await connection.query('SELECT * FROM procesos');
    res.json(result.recordset);

    
};

// Crear un nuevo proceso
const createProceso = async (req, res) => {
    const { nombre, descripcion, responsable_id, equipo_asignado, horas_hombre, proceso_padre_id } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('responsable_id', sql.Int, responsable_id || null)
            .input('equipo_asignado', sql.NVarChar, equipo_asignado)
            .input('horas_hombre', sql.Decimal(10, 2), horas_hombre)
            .input('proceso_padre_id', sql.Int, proceso_padre_id || null)
            .query(`INSERT INTO Procesos (nombre, descripcion, responsable_id, equipo_asignado, horas_hombre, proceso_padre_id) 
                    VALUES (@nombre, @descripcion, @responsable_id, @equipo_asignado, @horas_hombre, @proceso_padre_id)`);
        res.status(201).json({ message: 'Proceso creado exitosamente' });
    } catch (err) {
        console.error('Error al crear el proceso:', err);
        res.status(500).json({ error: 'Error al crear el proceso' });
    }
};



const getProceso = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Procesos WHERE proceso_id = @id');
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Error al obtener el proceso:', err);
        res.status(500).json({ error: 'Error al obtener el proceso' });
    }
};



const updateProceso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, responsable_id, equipo_asignado, horas_hombre, proceso_padre_id } = req.body;
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('responsable_id', sql.Int, responsable_id || null)
            .input('equipo_asignado', sql.NVarChar, equipo_asignado)
            .input('horas_hombre', sql.Decimal(10, 2), horas_hombre)
            .input('proceso_padre_id', sql.Int, proceso_padre_id || null)
            .input('id', sql.Int, id)
            .query(`UPDATE Procesos 
                    SET nombre = @nombre, 
                        descripcion = @descripcion, 
                        responsable_id = @responsable_id,
                        equipo_asignado = @equipo_asignado,
                        horas_hombre = @horas_hombre,
                        proceso_padre_id = @proceso_padre_id
                    WHERE proceso_id = @id`);
        
        res.json({ message: 'Proceso actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar el proceso:', err);
        res.status(500).json({ error: 'Error al actualizar el proceso' });
    }
};



const deleteProceso = (req, res) => {
    res.send('eliminando proceso con id ');
}   


export {getProcesos, createProceso, getProceso, updateProceso, deleteProceso};
