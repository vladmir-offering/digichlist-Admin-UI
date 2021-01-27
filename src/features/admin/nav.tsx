import React from 'react';
import { Dashboard, Group, InsertChartSharp, SupervisedUserCircle } from '@material-ui/icons';

export const navList: any = [
    {
        path: '/admin/dashboard',
        icon: <Dashboard />,
        title: 'Головна',
    },
    {
        path: '/admin/admins',
        icon: <SupervisedUserCircle />,
        title: 'Адміни',
    },
    {
        path: '/admin/users',
        icon: <Group />,
        title: 'Користувачі',
    },
    {
        path: '/admin/defects',
        icon: <InsertChartSharp />,
        title: 'Дефекти',
    },
];
