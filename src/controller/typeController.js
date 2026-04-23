import pool from '../config/db.js';

//Puxar todos os dados
const getAll = async () => {
    const result  = await pool.query('SELECT * FROM tipos');
    return result.rows;
};