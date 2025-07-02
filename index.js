import 'dotenv/config.js';
import express from 'express';

import {
    CreateUserController,
    UpdateUserController,
    GetUserByIdController,
    DeleteUserController,
} from './src/controllers/index.js';
import {
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from './src/use-cases/index.js';
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from './src/repositories/postgres/index.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
    const { statusCode, body } = await getUserByIdController.execute(req);

    res.status(statusCode).json(body);
});

app.post('/api/users', async (req, res) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserRepository = new PostgresCreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    );
    const createUserController = new CreateUserController(createUserUseCase);
    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
    );
    const updatedUserController = new UpdateUserController(updateUserUseCase);
    const { statusCode, body } = await updatedUserController.execute(req);

    res.status(statusCode).json(body);
});

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = new DeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).json(body);
});

app.listen(process.env.SERVER_PORT, () =>
    console.log(
        `******** Listening on port ${process.env.SERVER_PORT}  ********`,
    ),
);
