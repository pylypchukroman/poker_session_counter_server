import { Balance } from '../models/balance.ts';
import { HttpError } from '../helpers/HttpError.ts';
import { ctrlWrapper } from '../helpers/ctrlWrapper.ts';

const getAll = async (req, res) => {
    const result = await Balance.find();
    res.json(result);
};

const getById = async (req, res) => {
    const { balanceId } = req.params;
    const result = await Balance.findById(balanceId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
};

const addBalance = async (req, res) => {
    const result = await Balance.create(req.body);
    res.status(201).json(result);
};

const deleteBalance = async (req, res) => {
    const { balanceId } = req.params;
    const result = await Balance.findByIdAndDelete(balanceId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json({
        message: "balance deleted"
    })
};

const updateBalance = async (req, res) => {
    const { balanceId } = req.params;
    const result = await Balance.findByIdAndUpdate(balanceId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
};

const editBalance = async (req, res) => {
    const { balanceId } = req.params;
    const result = await Balance.findByIdAndUpdate(balanceId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
};

export const balancesController = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addBalance: ctrlWrapper(addBalance),
    deleteBalance: ctrlWrapper(deleteBalance),
    updateBalance: ctrlWrapper(updateBalance),
    editBalance: ctrlWrapper(editBalance),
};
