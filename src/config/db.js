import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: "yourStrong#Password",
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('SQL Server connected');
        return pool;
        
        // Ejecutar una consulta simple para obtener la fecha actual
        const result = await pool.request().query('SELECT GETDATE()');
        console.log('Current Date from SQL Server:', result);
        
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}