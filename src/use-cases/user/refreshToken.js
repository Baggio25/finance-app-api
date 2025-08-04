import { UnauthorizedError } from '../../errors/user.js';

export class RefreshTokenUseCase {
    constructor(tokensGeneratorAdapter, tokenVerifierAdapter) {
        this.tokensGeneratorAdapter = tokensGeneratorAdapter;
        this.tokenVerifierAdapter = tokenVerifierAdapter;
    }

    execute(refreshToken) {
        const decodedToken = this.tokensGeneratorAdapter.execute(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
        );
        if (!decodedToken) {
            throw new UnauthorizedError();
        }

        return this.tokensGeneratorAdapter.execute(decodedToken.userId);
    }
}
