import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount !== 'number') {
        return false;
    }
    return validator.isCurrency(amount.toFixed(2), {
        digits_after_decimal: [2],
        allow_decimal: true,
        decimal_separator: '.',
    });
};

export const checkIfTypeIsValid = (type) =>
    ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type);

export const invalidAmountResponse = () =>
    badRequest({
        message: 'The amount must be a valid currency',
    });

export const invalidTypeResponse = () =>
    badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTMENT.',
    });
