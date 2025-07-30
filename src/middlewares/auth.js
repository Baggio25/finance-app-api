import jwt from 'jsonwebtoken';

export const auth = (request, response, next) => {
    try {
        const accessToken = request.headers?.authorization?.split('Bearer ')[1];
        if (!accessToken) {
            console.error('Access Token invalid === Unauthorized');
            return response.status(401).send({
                message: 'Unauthorized',
            });
        }

        const decodedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
        );
        if (!decodedToken) {
            console.error('Decoded Token invalid === Unauthorized');
            return response.status(401).send({
                message: 'Unauthorized',
            });
        }

        request.userId = decodedToken.userId;

        next();
    } catch (error) {
        console.error('Erro catch: ', error);
        return response.status(401).send({
            message: 'Unauthorized',
        });
    }
};
