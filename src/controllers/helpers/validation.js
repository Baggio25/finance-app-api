import validator from 'validator';
import { badRequest } from './http.js';

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided is not valid.',
    });

export const requiredFieldIsMissingResponse = (field) => {
    return badRequest({
        message: `The field '${field}' is required`,
    });
};

export const checkIfIdIsValid = (userId) => validator.isUUID(userId);
