/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';

import { colors } from '@material-ui/core';
import { LockOpen, HourglassEmpty, DoneAll } from '@material-ui/icons';

export interface FilteredDefectNumbers {
    OpenDefectsCount: number;
    ProccessDefectsCount: number;
    ClosedDefectsCount: number;
}
export const Data = {
    datasets: [
        {
            backgroundColor: colors.indigo[500],
            data: [18, 5, 19, 27, 29, 19, 20],
            label: 'This year',
        },
        {
            backgroundColor: colors.orange[200],
            data: [11, 20, 12, 29, 30, 25, 13],
            label: 'Last year',
        },
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
};

export const CircleData = (
    open_defects: number,
    proccess_defects: number,
    closed_defects: number,
): any => {
    return {
        datasets: [
            {
                data: [+open_defects, +proccess_defects, +closed_defects],
                backgroundColor: ['#4caf50', '#ff9800', '#e0e0e0'],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white,
            },
        ],
        labels: ['Відкриті', 'В процесі', 'Закриті'],
        apperiance: [
            {
                title: 'Відкриті',
                value: open_defects,
                icon: <LockOpen />,
                color: '#4caf50',
            },
            {
                title: 'В процесі',
                value: proccess_defects,
                icon: <HourglassEmpty />,
                color: '#ff9800',
            },
            {
                title: 'Закриті',
                value: closed_defects,
                icon: <DoneAll />,
                color: '#e0e0e0',
            },
        ],
    };
};

export const CircleDataOptions = (theme): any => {
    return {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false,
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary,
        },
    };
};
