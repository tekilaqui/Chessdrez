import client from './client';

export const login = async (email: string, password: string) => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (email: string, password: string, name?: string) => {
    const response = await client.post('/auth/register', { email, password, name });
    return response.data;
};

export const getMe = async () => {
    const response = await client.get('/auth/me');
    return response.data;
};
