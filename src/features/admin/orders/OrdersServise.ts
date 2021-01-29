import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';

export const getOrders = async () => await telegramApiAxios.get(`${environment.BASEURL}order/all`);

export const updateOrderData = async (ordersData, editOrder) => {
    try {
        const newData = {
            ...editOrder.data,
            done: !editOrder.data.done,
        };
        const response = await telegramApiAxios.patch(
            `${environment.BASEURL}order/update/${editOrder.data._id}`,
            newData,
        );

        const updatedList = ordersData.map((item) =>
            response.data.order._id === item._id ? response.data.order : item,
        );
        return updatedList;
    } catch (err) {
        return { err: err };
    }
};
