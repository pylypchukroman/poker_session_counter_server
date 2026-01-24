import { Types } from 'mongoose';

export type TournamentStatus = "running" | "finished";

export type SessionStatus = "running" | "finished";

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type BalancePayload = {
  name: string;
  balance: number;
  owner?: string;
};

export type EditBalancePayload = {
  balance: number;
};

export type EditCashSessionPayload = {
  finishedAt: Date;
  status: 'finished';
  balancesEnd: PokerRoomBalance[];
};

export type CreateCashSessionPayload = {
  startedAt: Date;
  finishedAt: Date | null;
  status: SessionStatus;
  balancesStart: PokerRoomBalance[];
  balancesEnd: PokerRoomBalance[];
  owner?: string;
};

export type CreateTournamentPayload = {
  room: string;
  name: string;
  buyIn: number;
  startedAt: Date;
  finishedAt: Date | null;
  status: TournamentStatus;
  result?: number;
};

export type AddTournamentPayload = {
  room: string;
  name: string;
  buyIn: number;
  startedAt: Date;
  status: 'running';
  result: number;
};

export type FinishTournamentPayload = {
  finishedAt: Date;
  status: 'finished';
  result: number;
};

export type CreateTournamentSessionPayload = {
  startedAt: Date;
  finishedAt: Date | null;
  status: TournamentStatus;
  tournaments: CreateTournamentPayload[];
  owner?: string;
};

export type FinishTournamentSessionPayload = {
  finishedAt: Date;
  status: 'finished';
};

export type EditTournamentSessionPayload = {
  status: TournamentStatus;
};

export type User = {
  name: string;
  email: string;
  password: string;
  token: string | null;
};

export type Balance = {
  name: string;
  balance: number;
  owner: string;
}

export type PokerRoomBalance = {
  name: string;
  balance: number;
}

export type PokerSession = {
  startedAt: Date;
  finishedAt: Date | null;
  status: "running" | "finished";
  balancesStart: PokerRoomBalance[];
  balancesEnd: PokerRoomBalance[];
}

export type Tournament = {
  id: Types.ObjectId;
  room: string
  name: string;
  buyIn: number;
  startedAt: Date;
  finishedAt: Date | null;
  status: TournamentStatus;
  result?: number;
  owner?: string
}

export type TournamentSession = {
  startedAt: Date;
  finishedAt: Date | null;
  status: SessionStatus;
  tournaments: Tournament[];
  owner: string;
  id: string
}

export type BalanceParams = {
  balanceId: string;
}

export type SessionParams = {
  sessionId: string;
}

export type RequestWithUser = Request & { user: User };

export interface HttpErrorType extends Error {
  status: number;
}

export interface CreateBalanceDTO {
  name: string;
  balance: number;
}
export interface EditBalanceDTO {
  balance: number;
}
