import 'dotenv/config.js';
import express from 'express';

import { usersRouter } from './src/routes/users.js';
import { transactionsRouter } from './src/routes/transactions.js';

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

app.listen(process.env.SERVER_PORT, () =>
    console.log(
        `******** Listening on port ${process.env.SERVER_PORT}  ********`,
    ),
);
