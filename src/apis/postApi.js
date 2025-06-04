import apiFetch from './apiFetch';

const getToken = () => localStorage.getItem('rentahouse_token');

// GET /posts?categoryId=...&priceRange=...&location=...&bedroom=...&userId=...
export const getAllPosts = (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return apiFetch(`/posts?${query}`);
};

export const getPostById = (id) => {
  return apiFetch(`/posts/${id}`);
};

// createPost has to use raw fetch because apiFetch doesn't support FormData
export const createPost = (formData) => {
  const token = getToken();

  return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // FormData must be raw, no JSON.stringify
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || 'API Error');
    }
    return res.json();
  });
};

export const updatePost = (id, body) => {
  const token = getToken();
  return apiFetch(`/posts/${id}`, {
    method: 'PUT',
    body,
    token,
  });
};

export const deletePost = (id) => {
  const token = getToken();
  return apiFetch(`/posts/${id}`, {
    method: 'DELETE',
    token,
  });
};