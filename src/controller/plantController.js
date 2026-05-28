import plantModel from '../model/plantModel.js'

const getAll = async (req, res) => {
    const plantas = await plantModel.getAll();
    res.json(plantas);
};

const create = async (req, res) => {
    const { nome, preco, quantidade, id_tipos } = req.body;

    const planta = await plantModel.create(
        nome,
        preco,
        quantidade,
        id_tipos
    );

    res.status(201).json(planta);
};

const remove = async (req, res) => {
    const { id } = req.params;

    await plantModel.remove(id);

    res.status(200).json({
        message: 'Planta excluída com sucesso!'
    });
};
export default {
    getAll,
    create,
    remove
};