import pool from '../config/db.js';

const getAll = async() => {
    const result = await pool.query('SELECT* FROM tipos');
    return result.rows; 
};
//Criar novo tipo
const create =async (name) =>{
    const result = await pool.query(
        'INSERT INTO tipos (nome_tipos) VALUES ($1) RETURNING*',
        [name]
    );

    return result.rows[0];
};

// Deletar tipo
const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM tipos WHERE id_tipos = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

export default {
    getAll,
    create,
    remove
};