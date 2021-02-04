import axios from 'axios';
import { environment } from '../../environments/environment';

export const login = async (body) => {
    try {
        const response = await axios.post(`${environment.BASEURL}authorization/login`, body);
        sessionStorage.setItem('secret-auth-token', response.data.token);
        return response.data;
    } catch (err) {
        return { err: err };
    }
};
export const logOut = () => {
    sessionStorage.removeItem('secret-auth-token');
};
export const isLogged = () => {
    return !!sessionStorage.getItem('secret-auth-token');
};
