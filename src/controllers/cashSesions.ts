import { CashSessions } from '../models/cashSessins.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';
import { HttpError } from '../helpers/HttpError.js';

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  if (!owner) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const result = await CashSessions.find({ owner });
  res.json(result);
}

const getById = async (req, res) => {
  const { sessionId } = req.params;
  const result = await CashSessions.findById(sessionId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.params;
  const result = await CashSessions.findByIdAndDelete(sessionId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "session deleted"
  })
};

const addSession = async (req, res) => {
  const { id: owner } = req.user;
  if (!owner) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const result = await CashSessions.create({...req.body, owner: owner});
  res.status(201).json(result);
};

const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const result = await CashSessions.findByIdAndUpdate(sessionId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const editSession = async (req, res) => {
  const { sessionId } = req.params;
  const result = await CashSessions.findByIdAndUpdate(sessionId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

export const cashSessionsController = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  deleteSession: ctrlWrapper(deleteSession),
  addSession: ctrlWrapper(addSession),
  updateSession: ctrlWrapper(updateSession),
  editSession: ctrlWrapper(editSession)
};
