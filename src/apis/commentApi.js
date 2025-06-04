import apiFetch from './apiFetch';

const token = localStorage.getItem('rentahouse_token');

export const getAllComments = () =>
  apiFetch('/commentforms', {
    method: 'GET',
    token,
  });

export const getCommentsByUser = (userId) =>
  apiFetch(`/commentforms/user/${userId}`, {
    method: 'GET',
    token,
  });

export const createComment = ({ postId, content, rating }) => {
  return apiFetch('/commentforms', {
    method: 'POST',
    body: { postId, content, rating },
    token,
  });
};

export const deleteComment = (id) =>
  apiFetch(`/commentforms/${id}`, {
    method: 'DELETE',
    token,
  });