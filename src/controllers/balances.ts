import { Balance } from '../models/balance.ts';
import { HttpError } from '../helpers/HttpError.ts';
import { ctrlWrapper } from '../helpers/ctrlWrapper.ts';
import type { Request, Response } from "express";
import type { BalanceParams, CreateBalanceDTO, EditBalanceDTO } from '../types/types';

const getAll = async (req: Request, res: Response) => {
    const { id: owner } = req.user;
    const { limit, page } = req.query;
    const skip = page - 1 * limit;
    const result = await Balance.find({ owner });
    res.json(result);
};

const getById = async (req: Request<BalanceParams>, res: Response) => {
    const { balanceId } = req.params;
    const result = await Balance.findById(balanceId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
};

const addBalance = async (req: Request<CreateBalanceDTO>, res: Response) => {
    const { id: owner } = req.user;
    if (!owner) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await Balance.create({...req.body, owner: owner});
    res.status(201).json(result);
};

const deleteBalance = async (req: Request<BalanceParams>, res: Response<{ message: string }>) => {
    const { balanceId } = req.params;
    const result = await Balance.findByIdAndDelete(balanceId);
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json({
        message: "balance deleted"
    })
};

const updateBalance = async (req: Request<BalanceParams, {}, EditBalanceDTO>, res: Response) => {
    const { balanceId } = req.params;
    const result = await Balance.findByIdAndUpdate(balanceId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
};

const editBalance = async (req: Request<BalanceParams, {}, EditBalanceDTO>, res: Response) => {
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
