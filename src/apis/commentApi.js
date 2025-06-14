import apiFetch from './apiFetch';

export const getAllComments = () => apiFetch('/commentforms');

export const createComment = ({ postId, content, rating }) =>
  apiFetch('/commentforms', {
    method: 'POST',
    body: { postId, content, rating },
  });

export const deleteComment = (id) =>
  apiFetch(`/commentforms/${id}`, {
    method: 'DELETE',
  });