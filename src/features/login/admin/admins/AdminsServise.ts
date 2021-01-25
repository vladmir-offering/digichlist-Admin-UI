import { telegramApiAxios } from '../../../../common/utils/interceptor';
import { environment } from '../../../../environments/environment';
import axios from 'axios';

export const getAdmins = async () => await telegramApiAxios.get(`${environment.BASEURL}admin/all`);
