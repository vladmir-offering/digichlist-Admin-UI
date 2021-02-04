import { ISnackbar } from '../../../common/components/Snackbar/snackbar';
import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';
import { GetDefects, Defect } from './DefectsModels';

export async function getDefects(): Promise<GetDefects> {
    return await telegramApiAxios.get(`${environment.BASEURL}defect/all`).then((res) => {
        return res.data;
    });
}
export async function editDefect(id: string | undefined, body: Defect): Promise<any> {
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
    admin_username: string | null,
    setSnack: React.Dispatch<React.SetStateAction<ISnackbar>>,
    setDataSource: any,
    closeModal: any,
): void {
    if (
        data.values.title === data.intialFormValues.title &&
        data.values.room === data.intialFormValues.room &&
        data.values.status === data.intialFormValues.status &&
        data.values.open_date === data.intialFormValues.open_date &&
        data.values.priority === data.intialFormValues.priority
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
            admin_username,
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
    setSnack: React.Dispatch<React.SetStateAction<ISnackbar>>,
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
export function checkModeSumbit(
    data,
    admin_username: string | null,
    statusValue,
    setSnack: React.Dispatch<React.SetStateAction<ISnackbar>>,
    setDataSource,
): void {
    const id = data._id;
    const updatedData: Defect = {
        ...data,
        _id: id,
        status: statusValue,
        open_date: new Date(data.open_date).toISOString().substr(0, 10),
        admin_username,
    };
    editDefect(id, updatedData)
        .then((res) => {
            if (res.response === 'ok') {
                setDataSource((prevVal) =>
                    prevVal.map((item) => (item._id === id ? (item = { ...res.defect }) : item)),
                );
                setSnack({
                    open: true,
                    message: 'Дефект виправлено',
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
export function FilterByPriority(filter, filteredArr, setDataSource, setFilteredDataSource): void {
    switch (filter) {
        case 0:
            getDefects().then((res) => {
                setDataSource(res.defects);
                setFilteredDataSource(res.defects);
            });
            break;
        case 1:
            setDataSource(filteredArr.filter((item: any) => item.priority === filter));
            break;
        case 2:
            setDataSource(filteredArr.filter((item: any) => item.priority === filter));
            break;
        case 3:
            setDataSource(filteredArr.filter((item: any) => item.priority === filter));
            break;
        case 4:
            setDataSource(filteredArr.filter((item: any) => item.priority === filter));
            break;
        default:
            setDataSource(filteredArr);
    }
}
export function FilterByStatus(filter, filteredArr, setDataSource, setFilteredDataSource): void {
    switch (filter) {
        case 'all':
            getDefects().then((res) => {
                setDataSource(res.defects);
                setFilteredDataSource(res.defects);
            });
            break;
        case 'open':
            setDataSource(filteredArr.filter((item: any) => item.status === filter));
            break;
        case 'fixing':
            setDataSource(filteredArr.filter((item: any) => item.status === filter));
            break;
        case 'solved':
            setDataSource(filteredArr.filter((item: any) => item.status === filter));
            break;
        default:
            setDataSource(filteredArr);
    }
}
