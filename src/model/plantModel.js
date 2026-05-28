import pool from '../config/db.js';

const getAll = async () => {
    const result = await pool.query('SELECT * FROM plantas');
    return result.rows;
};

const create = async (nome, preco, quantidade, id_tipos) => {
    const result = await pool.query(
        `INSERT INTO plantas (nome, preco, quantidade, id_tipos)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [nome, preco, quantidade, id_tipos]
    );

    return result.rows[0];
};

const remove = async (id) => {
    await pool.query(
        'DELETE FROM plantas WHERE id_plantas = $1',
        [id]
    );
};

export default {getAll, create, remove};