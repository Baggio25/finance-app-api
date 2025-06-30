import validator from 'validator';
import { badRequest } from '../helpers/http.js';

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Some provided field is not allowed.',
    });

export const emailAlreadyInUseResponse = () =>
    badRequest({
        message: 'Invalid e-mail. Please provide a valid one.',
    });

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided is not valid.',
    });

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (userId) => validator.isUUID(userId);
