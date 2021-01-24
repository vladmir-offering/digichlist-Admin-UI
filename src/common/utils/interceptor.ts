import axios from 'axios';

import { logOut } from './api';

export const telegramApiAxios = axios.create({});
telegramApiAxios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('secret-auth-token');
    console.log(token);
    if (token) {
        console.log('sdf');
        config.headers.Authorization = token;
    }
    return config;
});

telegramApiAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            logOut();
            window.location.reload();
        }
        return error;
    },
);
