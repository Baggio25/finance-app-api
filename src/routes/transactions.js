import { Router } from 'express';

import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
} from '../factories/controllers/transaction.js';

import { auth } from '../middlewares/auth.js';

export const transactionsRouter = Router();

transactionsRouter.post('/', auth, async (req, res) => {
    const createTransactionController = makeCreateTransactionController();
    const { statusCode, body } = await createTransactionController.execute({
        ...req,
        body: {
            ...req.body,
            user_id: req.userId,
        },
    });

    res.status(statusCode).send(body);
});

transactionsRouter.get('/', auth, async (req, res) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController();
    const { statusCode, body } =
        await getTransactionsByUserIdController.execute({
            ...req,
            query: {
                ...req.query,
                userId: req.userId,
            },
        });

    res.status(statusCode).send(body);
});

transactionsRouter.patch('/:transactionId', auth, async (req, res) => {
    const updateTransactionController = makeUpdateTransactionController();
    const { statusCode, body } = await updateTransactionController.execute({
        ...req,
        body: {
            ...req.body,
            user_id: req.userId,
        },
    });

    res.status(statusCode).send(body);
});

transactionsRouter.delete('/:transactionId', auth, async (req, res) => {
    const deleteTransactionController = makeDeleteTransactionController();
    const { statusCode, body } = await deleteTransactionController.execute({
        ...req,
        query: {
            ...req.query,
            userId: req.userId,
        },
    });

    res.status(statusCode).send(body);
});
