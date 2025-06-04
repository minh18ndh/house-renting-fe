import apiFetch, { STATIC_URL } from './apiFetch';

export const getAllPosts = (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return apiFetch(`/posts?${query}`);
};

export const getPostById = (id) => apiFetch(`/posts/${id}`);

export const createPost = (formData) => {
  const token = localStorage.getItem('rentahouse_token');
  return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // Don't JSON.stringify FormData
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || 'API Error');
    }
    return res.json();
  });
};

export const updatePost = (id, body) =>
  apiFetch(`/posts/${id}`, {
    method: 'PUT',
    body,
  });

export const deletePost = (id) =>
  apiFetch(`/posts/${id}`, {
    method: 'DELETE',
  });