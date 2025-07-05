export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository;
    }

    async execute(transactionId, params) {
        return await this.updateTransactionRepository.execute(
            transactionId,
            params,
        );
    }
}
