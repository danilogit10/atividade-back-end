import pool from '../config/db.js';
import typeModel from '../model/typeModel.js';

//Puxar todos os dados
const getAll = async () => {
    const result  = await typeModel.getAll();
    result.json(types);
};

const create = async (req, res) => {
    const {name} = req.body;

// validação simples
if (!name) {
    return res.status(400).json({
        message: 'O nome é obrigatorio',
    });
}

const newType = await typeModel.create(name);
res.status(201).json(newType);
};

const remove = async (req,res) => {
    const deletedType = await typeModel.remove(req.params.id);

//Verificar se encontrou o tipo
if (deletedType) {
    return res.status(404).json({
        message: 'Tipo não encontrado'
    });
}

res.status(200).json({
    message: 'Tipo deletado com sucesso',
    deletedType 
});
}


   export default { getAll, create, remove};
