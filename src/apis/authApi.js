import apiFetch from './apiFetch';

export const loginApi = (email, password) =>
    apiFetch('/auth/login', {
        method: 'POST',
        body: { email, password },
    });

export const signupApi = (fullName, email, password, phone) =>
    apiFetch('/auth/register', {
        method: 'POST',
        body: { fullName, email, password, phone },
    });

export const getMeApi = () => apiFetch('/auth/me');