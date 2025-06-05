import apiFetch from './apiFetch';

export const getTotalViews = () => apiFetch('/totalviews');

export const incrementView = () =>
    apiFetch(`/totalviews`, {
        method: 'PUT',
    });