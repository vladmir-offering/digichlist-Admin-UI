import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';
import { GetDefects, Defect } from './models/DefectsModels';

export async function getDefects(): Promise<GetDefects> {
    return await telegramApiAxios.get(`${environment.BASEURL}defect/all`).then((res) => {
        return res.data;
    });
}
export async function editDefect(id: string | undefined, body: Defect): Promise<GetDefects> {
    return await telegramApiAxios
        .patch(`${environment.BASEURL}defect/update/${id}`, body)
        .then((res) => res.data);
}
export async function deleteDefect(id: string): Promise<GetDefects> {
    return await telegramApiAxios
        .delete(`${environment.BASEURL}defect/delete/${id}`)
        .then((res) => res.data);
}

export function updateModeSubmit(
    data: any,
    setSnack: any,
    setDataSource: any,
    closeModal: any,
): void {
    if (
        data.values.title === data.intialFormValues.title &&
        data.values.room === data.intialFormValues.room &&
        data.values.status === data.intialFormValues.status &&
        data.values.open_date === data.intialFormValues.open_date
    ) {
        setSnack({
            open: true,
            message: 'Потрібно щось змінити',
            type: 'info',
        });
    } else {
        const updatedData: Defect = {
            ...data.values,
            open_date: new Date(data.values.open_date).toISOString().substr(0, 10),
        };
        editDefect(data.id, updatedData)
            .then((res) => {
                if (res.response === 'ok') {
                    setDataSource((prevVal) =>
                        prevVal.map((item) =>
                            item._id === data.id ? (item = { _id: data.id, ...data.values }) : item,
                        ),
                    );
                    closeModal();
                    setSnack({
                        open: true,
                        message: 'Дефект успішно оновлено',
                        type: 'success',
                    });
                }
            })
            .catch((err) =>
                setSnack({
                    open: true,
                    message: `На сервері сталась помилка - ${err}`,
                    type: 'error',
                }),
            );
    }
}
export function deleteModeSubmit(
    id: any,
    setSnack: any,
    setDataSource: any,
    closeModal: any,
): void {
    deleteDefect(id)
        .then((res) => {
            if (res.response === 'ok') {
                setDataSource((prevVal) => prevVal.filter((tableDefect) => tableDefect._id !== id));
                closeModal();
                setSnack({
                    open: true,
                    message: 'Дефект успішно видалено',
                    type: 'success',
                });
            }
        })
        .catch((err) =>
            setSnack({
                open: true,
                message: `На сервері сталась помилка - ${err}`,
                type: 'error',
            }),
        );
}
export function checkModeSumbit(body, statusType, setSnack, setDataSource): void {
    const id = body._id;
    const updatedData: Defect = {
        ...body,
        _id: id,
        status: statusType,
        open_date: new Date(body.open_date).toISOString().substr(0, 10),
    };
    editDefect(id, updatedData).then((res) => console.log(res));
}
