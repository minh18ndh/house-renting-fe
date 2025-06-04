const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiFetch = async (endpoint, { method = 'GET', body, token } = {}) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || 'API Error');
    }

    return res.json();
};

export default apiFetch;