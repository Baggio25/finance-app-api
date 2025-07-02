export class DeleteUserByIdUseCase {
    constructor(deleteUserByIdRepository) {
        this.deleteUserByIdRepository = deleteUserByIdRepository;
    }

    async execute(userId) {
        return await this.deleteUserByIdRepository.execute(userId);
    }
}
