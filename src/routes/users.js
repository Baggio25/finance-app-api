import { Router } from 'express';

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalance,
    makeGetUserByIdController,
    makeLoginUserController,
    makeUpdateUserController,
} from '../factories/controllers/user.js';
import { auth } from '../middlewares/auth.js';

export const usersRouter = Router();

usersRouter.get('/', auth, async (req, res) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute({
        ...req,
        params: {
            userId: req.userId,
        },
    });

    res.status(statusCode).json(body);
});

usersRouter.get('/balance', auth, async (req, res) => {
    const getUserBalanceController = makeGetUserBalance();
    const { statusCode, body } = await getUserBalanceController.execute({
        ...req,
        params: {
            userId: req.userId,
        },
    });

    res.status(statusCode).send(body);
});

usersRouter.post('/', async (req, res) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.post('/login', async (req, res) => {
    const createUserController = makeLoginUserController();
    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.patch('/', auth, async (req, res) => {
    const updatedUserController = makeUpdateUserController();
    const { statusCode, body } = await updatedUserController.execute({
        ...req,
        params: {
            userId: req.userId,
        },
    });

    res.status(statusCode).send(body);
});

usersRouter.delete('/', auth, async (req, res) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute({
        ...req,
        params: {
            userId: req.userId,
        },
    });

    res.status(statusCode).send(body);
});
