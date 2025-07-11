import { UserNotFoundError } from '../../errors/user.js';
import { v4 as uuidV4 } from 'uuid';

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id;
        const user = await this.getUserByIdRepository.execute(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const transactionId = uuidV4();

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        });

        return transaction;
    }
}
