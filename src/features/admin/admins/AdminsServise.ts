import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';

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
        const newData = {
            email: editAdmin.data.email,
            username: editAdmin.data.username,
            password: editAdmin.data.password,
        };
        const response = await telegramApiAxios.patch(
            `${environment.BASEURL}admin/update/${editAdmin.editId}`,
            newData,
        );

        const updatedList = adminsData.map((item) =>
            response.data.admin._id === item._id ? response.data.admin : item,
        );
        return updatedList;
    } catch (err) {
        return { err: err };
    }
};
