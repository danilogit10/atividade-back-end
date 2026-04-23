import pool from '../config/db.js';

const getAll = async() => {
    const result = await pool.query('SELECT* FROM tipos');
    return result.rows; 
};