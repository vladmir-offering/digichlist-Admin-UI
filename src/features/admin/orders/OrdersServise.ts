import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';

export const getOrders = async () => {
    try {
        const response = await telegramApiAxios.get(`${environment.BASEURL}order/all`);
        for (const item of response.data.orders) {
            const user = await telegramApiAxios.get(
                `${environment.BASEURL}user/getById/${item.user}`,
            );
            if (!user.data.user) {
                item.username = "Ім'я не знайдено";
            } else {
                item.username = `${user.data.user.first_name} ${user.data.user.last_name}`;
            }
        }
        return response.data.orders;
    } catch (err) {
        return { err: err };
    }
};

export const updateOrderData = async (ordersData, editOrder) => {
    try {
        const newData = {
            ...editOrder.data,
            done: !editOrder.data.done,
            admin_username: localStorage.getItem('admin_username'),
        };
        const response = await telegramApiAxios.patch(
            `${environment.BASEURL}order/update/${editOrder.data._id}`,
            newData,
        );
        const user = await telegramApiAxios.get(
            `${environment.BASEURL}user/getById/${response.data.order.user}`,
        );
        response.data.order.username = `${user.data.user.first_name} ${user.data.user.last_name}`;
        const updatedList = ordersData.map((item) => {
            return response.data.order._id === item._id ? response.data.order : item;
        });
        return updatedList;
    } catch (err) {
        return { err: err };
    }
};

export const delOrdersData = async (id, ordersData) => {
    try {
        await telegramApiAxios.delete(`${environment.BASEURL}order/delete/${id}`);
        const updatedList = ordersData.filter((item) => id !== item._id);
        return updatedList;
    } catch (err) {
        return { err: 'Виникла проблема під час видалення' };
    }
};
