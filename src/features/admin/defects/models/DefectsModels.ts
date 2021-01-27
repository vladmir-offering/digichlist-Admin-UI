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
interface Filter {
    title: string;
    value: string;
    style: any;
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

export const filters: Array<Filter> = [
    { title: 'Всі дефекти', value: 'all', style: { backgroundColor: '#2196f3', color: 'white' } },
    {
        title: 'Відкриті дефекти',
        value: 'open',
        style: { backgroundColor: '#4caf50', color: 'white' },
    },
    {
        title: 'Дефекти в процесі',
        value: 'fixing',
        style: { backgroundColor: '#ff9800', color: 'white' },
    },
    { title: 'Закриті дефекти', value: 'solved', style: { backgroundColor: '##2196f3' } },
];
