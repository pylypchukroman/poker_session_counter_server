import { ctrlWrapper } from '../helpers/ctrlWrapper.ts';
import { HttpError } from '../helpers/HttpError.ts';
import { TournamentSessions } from '../models/tournamentSessions.ts';
import { Types } from 'mongoose';

export type TournamentStatus = "running" | "finished";

export interface Tournament {
  _id: Types.ObjectId;
  name: string;
  buyIn: number;
  startedAt: Date;
  finishedAt: Date | null;
  status: TournamentStatus;
  result?: number;
}

export interface ITournamentSession {
  _id: Types.ObjectId;
  startedAt: Date;
  finishedAt: Date | null;
  status: "running" | "finished";
  tournaments: Tournament[];
}

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  if (!owner) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const result = await TournamentSessions.find({ owner });
  res.json(result);
}

const getById = async (req, res) => {
  const { sessionId } = req.params;
  const result = await TournamentSessions.findById(sessionId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.params;
  const result = await TournamentSessions.findByIdAndDelete(sessionId);
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
  const result = await TournamentSessions.create({...req.body, owner: owner});
  res.status(201).json(result);
};

const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const result = await TournamentSessions.findByIdAndUpdate(sessionId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const editSession = async (req, res) => {
  const { sessionId } = req.params;
  const result = await TournamentSessions.findByIdAndUpdate(sessionId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};




const getAllTournaments = async (req, res) => {
  const { sessionId } = req.params;

  const session = await TournamentSessions.findById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  res.json(session.tournaments);
};

const getTournamentById = async (req, res) => {
  const { sessionId, tournamentId } = req.params;
  const session = await TournamentSessions.findById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  const tournament = session.tournaments.find(tournament => tournament.id === tournamentId)
  res.json(tournament);
};

const deleteTournament = async (req, res) => {
  const { sessionId, tournamentId } = req.params;
  const session = await TournamentSessions.findById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  const index = session.tournaments.findIndex(
    t => t._id.toString() === tournamentId
  );

  if (index === -1) {
    return res.status(404).json({ message: "Tournament not found" });
  }
  session.tournaments.splice(index, 1);
  await session.save();
  res.json({ message: "Tournament deleted successfully" });
};

const addTournament = async (req, res) => {
  const { sessionId } = req.params;
  const body = req.body;
  const session = await TournamentSessions.findById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  session.tournaments.push(body)
  await session.save();
  res.status(201).json(body);
};

const editTournament = async (req, res) => {
  const { sessionId, tournamentId } = req.params;
  const session = await TournamentSessions.findById(sessionId);
  if (!session) {
    throw HttpError(404, "Session not found");
  }
  const tournament = session.tournaments.find(t => t.id === tournamentId);
  if (!tournament) {
    throw HttpError(404, "Tournament not found");
  }
  tournament.finishedAt = req.body.finishedAt;
  tournament.status = req.body.status;
  tournament.result = req.body.result;

  await session.save();

  res.json(tournament);
};

export const tournamentSessionsController = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  deleteSession: ctrlWrapper(deleteSession),
  addSession: ctrlWrapper(addSession),
  updateSession: ctrlWrapper(updateSession),
  editSession: ctrlWrapper(editSession),

  getAllTournaments: ctrlWrapper(getAllTournaments),
  getTournamentById: ctrlWrapper(getTournamentById),
  deleteTournament: ctrlWrapper(deleteTournament),
  addTournament: ctrlWrapper(addTournament),
  editTournament: ctrlWrapper(editTournament)
}
