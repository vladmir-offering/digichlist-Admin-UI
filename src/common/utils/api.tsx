import axios from 'axios';
import { environment } from '../../environments/environment';

export class digichServise {
    private telegramApiAxios;
    private token;
    constructor() {
        localStorage.getItem('secret-auth-token')
            ? (this.token = localStorage.getItem('secret-auth-token'))
            : (this.token = '');
    }
    baseURL = `${environment.BASEURL}`;
    async login(body) {
        try {
            const response = await axios.post(`${environment.BASEURL}authorization/login`, body);
            localStorage.setItem('secret-auth-token', response.data.token);
            this.setToken(response.data.token);
            this.telegramApiAxios = axios.create({
                baseURL: this.baseURL,
                headers: {
                    Authorization: localStorage.getItem('secret-auth-token'),
                },
            });
            return response.data;
        } catch (err) {
            return { err: err };
        }
    }

    logOut() {
        localStorage.removeItem('secret-auth-token');
        this.setToken('');
    }
    setToken(value: string) {
        this.token = value;
    }
    isLogged() {
        return !!this.token;
    }
}
