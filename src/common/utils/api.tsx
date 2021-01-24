import axios from 'axios';
import { environment } from '../../environments/environment';

export class digichServise {
    private telegramApiAxios;
    baseURL = `${environment.BASEURL}`;
    async login(body) {
        try {
            const response = await axios.post(`${environment.BASEURL}authorization/login`, body);
            sessionStorage.setItem('secret-auth-token', response.data.token);
            this.telegramApiAxios = axios.create({
                baseURL: this.baseURL,
                headers: {
                    Authorization: sessionStorage.getItem('secret-auth-token'),
                },
            });
            return response.data;
        } catch (err) {
            return { err: err };
        }
    }
    logOut() {
        sessionStorage.removeItem('secret-auth-token');
    }
    isLogged() {
        return !!sessionStorage.getItem('secret-auth-token');
    }
}
