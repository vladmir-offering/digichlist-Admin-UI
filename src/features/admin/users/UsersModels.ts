import { TableCellProps } from '@material-ui/core';

export interface User {
    first_name: string;
    last_name: string;
    username: string;
    enabled: boolean;
    position: string; // 'Cleaner' 'Repairer 'None'
    chat_id: string;
}
export interface GetUsers {
    response: string;
    message: string;
    users: Array<User>;
}
interface Columns {
    id: string;
    label: string;
    minWidth?: string;
    align?: TableCellProps['align'];
}
interface AccessFilter {
    title: string;
    value: string;
}
interface PositionFilter {
    title: string;
    value: string;
}
export const columns: Array<Columns> = [
    { id: 'id', label: '№', minWidth: '10%' },
    {
        id: 'login',
        label: "Унікальне ім'я в системі",
        minWidth: '25%',
    },
    { id: 'fullname', label: "Повне ім'я", minWidth: '30%' },
    {
        id: 'position',
        label: 'Посада',
        minWidth: '10%',
    },
    {
        id: 'enabled',
        label: 'Доступ',
        minWidth: '15%',
        align: 'center',
    },
    {
        id: 'operations',
        label: 'Операції',
        minWidth: '10%',
        align: 'center',
    },
];
export const accesses: Array<AccessFilter> = [
    { title: 'Фільтр відсутній', value: 'No filter' },
    { title: 'Неактивований', value: 'false' },
    { title: 'Активований', value: 'true' },
];
export const positions: Array<PositionFilter> = [
    { title: 'Фільтр відсутній', value: 'No filter' },
    { title: 'Посада відсутня', value: 'None' },
    { title: 'Прибиральниця', value: 'Cleaner' },
    { title: 'Технічний працівник', value: 'Repairer' },
];
