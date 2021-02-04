import { TableCellProps } from '@material-ui/core';

export interface User {
    first_name: string;
    last_name: string;
    username: string;
    enabled: boolean;
}

export interface Defect {
    _id?: string;
    title: string;
    room: string;
    attachment: string;
    user?: User;
    status: string;
    open_date: Date;
}

export interface GetDefects {
    response: string;
    message: string;
    defects: Array<Defect>;
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
    { id: 'title', label: 'Опис', minWidth: '40%' },
    {
        id: 'room',
        label: 'Приміщенння',
        minWidth: '15%',
    },
    {
        id: 'status',
        label: 'Статус',
        minWidth: '20%',
        align: 'center',
    },
    {
        id: 'operations',
        label: 'Операції',
        minWidth: '15%',
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
