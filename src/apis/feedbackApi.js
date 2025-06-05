import apiFetch from './apiFetch';

export const getAllFeedbacks = () => apiFetch('/feedbackforms');

export const createFeedback = ({ content }) =>
  apiFetch('/feedbackforms', {
    method: 'POST',
    body: { content },
  });