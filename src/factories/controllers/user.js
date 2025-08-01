import {
    IdGeneratorAdapter,
    PasswordComparatorAdpater,
    PasswordHasherAdapter,
    TokensGeneratorAdapter,
} from '../../adapters/index.js';
import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
    LoginUserController,
} from '../../controllers/index.js';

import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js';

import {
    CreateUserUseCase,
    DeleteUserByIdUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
    LoginUserUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js';

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserRepository = new PostgresCreateUserRepository();
    const passwordHasherAdapter = new PasswordHasherAdapter();
    const idGeneratorAdapter = new IdGeneratorAdapter();
    const tokensGeneratorAdapter = new TokensGeneratorAdapter();
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
        tokensGeneratorAdapter,
    );
    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeLoginUserController = () => {
    const tokensGeneratorAdapter = new TokensGeneratorAdapter();
    const passwordComparatorAdapter = new PasswordComparatorAdpater();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const loginUserUseCase = new LoginUserUseCase(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokensGeneratorAdapter,
    );
    const loginUserController = new LoginUserController(loginUserUseCase);

    return loginUserController;
};

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();
    const passwordHasherAdapter = new PasswordHasherAdapter();
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
        passwordHasherAdapter,
    );
    const updatedUserController = new UpdateUserController(updateUserUseCase);

    return updatedUserController;
};

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteByIdUserUseCase = new DeleteUserByIdUseCase(
        deleteUserRepository,
    );
    const deleteUserController = new DeleteUserController(
        deleteByIdUserUseCase,
    );

    return deleteUserController;
};

export const makeGetUserBalance = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository();
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository,
    );
    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    );

    return getUserBalanceController;
};
