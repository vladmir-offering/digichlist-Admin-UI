import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';
import axios from 'axios';

export const getAdmins = async () => await telegramApiAxios.get(`${environment.BASEURL}admin/all`);

export const addAdminData = async (payload) => {
    try {
        const response = await telegramApiAxios.post(
            `${environment.BASEURL}admin/registration`,
            payload,
        );
        return response.data.admin;
    } catch (err) {
        return { err: err };
    }
};

export const deleteAdminData = async (id, adminsData) => {
    try {
        const response = await telegramApiAxios.delete(`${environment.BASEURL}admin/delete/${id}`);
        const updatedList = adminsData.filter((item) => id !== item._id);
        return updatedList;
    } catch (err) {
        return { err: err };
    }
};

export const updateAdminData = async (adminsData, editAdmin) => {
    try {
        const response = await telegramApiAxios.patch(
            `${environment.BASEURL}admin/update/${editAdmin.editId}`,
            editAdmin.data,
        );
        console.log(response.data.admin);

        const updatedList = adminsData.map((item) =>
            response.data.admin._id === item._id ? response.data.admin : item,
        );
        console.log(updatedList);
        return updatedList;
    } catch (err) {
        return { err: err };
    }
};
