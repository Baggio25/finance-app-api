import { Router } from 'express';

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalance,
    makeGetUserByIdController,
    makeUpdateUserController,
} from '../factories/controllers/user.js';

export const usersRouter = Router();

usersRouter.get('/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(req);

    res.status(statusCode).json(body);
});

usersRouter.get('/:userId/balance', async (req, res) => {
    const getUserBalanceController = makeGetUserBalance();
    const { statusCode, body } = await getUserBalanceController.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.post('/', async (req, res) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.patch('/:userId', async (req, res) => {
    const updatedUserController = makeUpdateUserController();
    const { statusCode, body } = await updatedUserController.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.delete('/:userId', async (req, res) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});
