import React from 'react';

import { colors } from '@material-ui/core';
import { LockOpen, HourglassEmpty, DoneAll } from '@material-ui/icons';
import { ChartData, ChartOptions } from 'chart.js';
import { Theme } from '@material-ui/core/styles';

export interface FilteredDefectNumbers {
    OpenDefectsCount: number;
    ProccessDefectsCount: number;
    ClosedDefectsCount: number;
}
export interface BarObject {
    title: string;
    value: number;
    icon: JSX.Element;
    color: string;
}
export interface ChartDataApperiance {
    apperiance: Array<BarObject>;
}
export const BarDataCreate = ({
    OpenDefectsCount,
    ProccessDefectsCount,
    ClosedDefectsCount,
}: FilteredDefectNumbers): ChartData => {
    return {
        datasets: [
            {
                data: [+OpenDefectsCount, +ProccessDefectsCount, +ClosedDefectsCount],
                backgroundColor: ['#4caf50', '#ff9800', '#e0e0e0'],
                barThickness: 140,
                maxBarThickness: 150,
                barPercentage: 1,
                categoryPercentage: 1,
            },
        ],
        labels: ['Відкриті', 'В процесі', 'Закриті'],
    };
};
export const BarDataOptions = (theme: Theme): ChartOptions => {
    return {
        responsiveAnimationDuration: 5000,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                        beginAtZero: true,
                        min: 0,
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: 2,
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: 2,
                        zeroLineColor: theme.palette.divider,
                    },
                },
            ],
        },
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
export const DoughnutDataCreate = ({
    OpenDefectsCount,
    ProccessDefectsCount,
    ClosedDefectsCount,
}: FilteredDefectNumbers): ChartData | ChartDataApperiance => {
    return {
        datasets: [
            {
                data: [+OpenDefectsCount, +ProccessDefectsCount, +ClosedDefectsCount],
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
                value: OpenDefectsCount,
                icon: <LockOpen />,
                color: '#4caf50',
            },
            {
                title: 'В процесі',
                value: ProccessDefectsCount,
                icon: <HourglassEmpty />,
                color: '#ff9800',
            },
            {
                title: 'Закриті',
                value: ClosedDefectsCount,
                icon: <DoneAll />,
                color: '#e0e0e0',
            },
        ],
    };
};
export const DoughnutDataOptions = (theme: Theme): ChartOptions => {
    return {
        responsiveAnimationDuration: 5000,
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
export type DatePeriodType = 'yesterday' | 'lastweek' | 'lastmonth';
export type StatusType = 'open' | 'fixing' | 'solved';
