import { telegramApiAxios } from '../../../common/utils/interceptor';
import { environment } from '../../../environments/environment';
import { GetUsers, User } from './UsersModels';

export async function getUsers(): Promise<GetUsers> {
    return await telegramApiAxios.get(`${environment.BASEURL}user/all`).then((res) => {
        return res.data;
    });
}
export async function editUser(id: string | undefined, body: User): Promise<any> {
    return await telegramApiAxios
        .patch(`${environment.BASEURL}user/update/${id}`, body)
        .then((res) => res.data);
}
export async function deleteUser(id: string): Promise<GetUsers> {
    return await telegramApiAxios
        .delete(`${environment.BASEURL}user/delete/${id}`)
        .then((res) => res.data);
}

export function updateModeSubmit(
    data: any,
    setSnack: any,
    setDataSource: any,
    closeModal: any,
): void {
    if (
        data.values.first_name === data.intialFormValues.first_name &&
        data.values.last_name === data.intialFormValues.last_name &&
        data.values.enabled === data.intialFormValues.enabled &&
        data.values.position === data.intialFormValues.position
    ) {
        setSnack({
            open: true,
            message: 'Потрібно щось змінити',
            type: 'info',
        });
    } else {
        const updatedData: User = {
            ...data.values,
        };
        editUser(data.id, updatedData)
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
                        message: 'Користувача успішно оновлено',
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
    deleteUser(id)
        .then((res) => {
            if (res.response === 'ok') {
                setDataSource((prevVal) => prevVal.filter((tableDefect) => tableDefect._id !== id));
                closeModal();
                setSnack({
                    open: true,
                    message: 'Користувача успішно видалено',
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
export function checkModeSumbit(data, enabledValue, setSnack, setDataSource): void {
    const id = data._id;
    const updatedData: User = {
        ...data,
        enabled: enabledValue,
    };
    editUser(id, updatedData)
        .then((res) => {
            if (res.response === 'ok') {
                setDataSource((prevVal) =>
                    prevVal.map((item) => (item._id === id ? (item = { ...res.user }) : item)),
                );
                setSnack({
                    open: true,
                    message: 'Доступ користувача активовано',
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
export function FilterByPosition(filter, filteredArr, setDataSource, setFilteredDataSource): void {
    switch (filter) {
        case 'No filter':
            getUsers().then((res) => {
                setDataSource(res.users);
                setFilteredDataSource(res.users);
            });
            break;
        case 'None':
            setDataSource(filteredArr.filter((item: any) => item.position === filter));
            break;
        case 'Cleaner':
            setDataSource(filteredArr.filter((item: any) => item.position === filter));
            break;
        case 'Repairer':
            setDataSource(filteredArr.filter((item: any) => item.position === filter));
            break;
        default:
            setDataSource(filteredArr);
    }
}
export function FilterByAccess(filter, filteredArr, setDataSource, setFilteredDataSource): void {
    switch (filter) {
        case 'No filter':
            getUsers().then((res) => {
                setDataSource(res.users);
                setFilteredDataSource(res.users);
            });
            break;
        case 'true':
            setDataSource(filteredArr.filter((item: any) => item.enabled === true));
            break;
        case 'false':
            setDataSource(filteredArr.filter((item: any) => item.enabled === false));
            break;
        default:
            setDataSource(filteredArr);
    }
}
