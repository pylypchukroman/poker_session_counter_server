import { Contact } from '../models/balance';
import { HttpError } from '../helpers/HttpError';
import { ctrlWrapper } from '../helpers/ctrlWrapper';

const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

const getById = async (req, res) => {
    const { balanceId } = req.params;
    const result = await Contact.findById(balanceId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
};

const addBalance = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteBalance = async (req, res) => {
    const { balanceId } = req.params;
    const result = await Contact.findByIdAndDelete(balanceId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json({
        message: "balance deleted"
    })
};

const editBalance = async (req, res) => {
    const { balanceId } = req.params;
    const result = await Contact.findByIdAndUpdate(balanceId, req.body, {new: true});
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
    editBalance: ctrlWrapper(editBalance),
};
