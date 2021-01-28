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
interface StatusFilter {
    title: string;
    value: string;
}
interface PriorityFilter {
    title: string;
    value: number;
}
export const columns: Array<Columns> = [
    { id: 'id', label: '№', minWidth: '10%' },
    { id: 'fullname', label: "Повне ім'я", minWidth: '30%' },
    {
        id: 'login',
        label: "Унікальне ім'я в системі",
        minWidth: '25%',
    },
    {
        id: 'position',
        label: 'Посада',
        minWidth: '10%',
    },
    {
        id: 'enabled',
        label: 'Статус',
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

export const statuses: Array<StatusFilter> = [
    { title: 'Фільтр відсутній', value: 'all' },
    { title: 'Відкриті дефекти', value: 'open' },
    { title: 'Дефекти в процесі', value: 'fixing' },
    { title: 'Закриті дефекти', value: 'solved' },
];
export const priorities: Array<PriorityFilter> = [
    { title: 'Фільтр відсутній', value: 0 },
    { title: 'Терміново', value: 1 },
    { title: 'Якнайшвидше', value: 2 },
    { title: 'Звичайне завдання', value: 3 },
    { title: 'Пріоритет відсутній', value: 4 },
];
