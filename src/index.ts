import express from "express";
import cors from "cors";
import { balancesRouter } from "./routes/api/balances/balances.ts"
import { cashSessionsRouter } from './routes/api/cashSessions/cashSessions.ts';
import { tournamentsSessionsRouter } from './routes/api/tournamentsSessions/tournamentsSessions.ts';

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/api/balances', balancesRouter);
app.use('/api/cash-sessions', cashSessionsRouter);
app.use('/api/tournaments-sessions', tournamentsSessionsRouter);

app.use((req, res) => {
  res.status(404).json({massage: "Not found"});
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

