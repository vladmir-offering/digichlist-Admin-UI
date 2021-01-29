import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    useTheme,
    Typography,
} from '@material-ui/core';

import { Bar, Doughnut } from 'react-chartjs-2';

import SnackbarHandler from '../../../common/components/Snackbar/snackbar';
import { getUserByName, CreateData, getDefectsNumbers } from './DashboardService';
import { User } from '../users/UsersModels';
import { CircleData, CircleDataOptions } from '../dashboard/DashboardModels';

function Dashboard(props): JSX.Element {
    const theme = useTheme();
    const [snack, setSnack] = useState({ open: false, message: '', type: '' });
    // const [currentUser, setCurrentUser] = useState({} as User);
    const cirlceOptions = CircleDataOptions(theme);
    const [circleData, setCircleData] = useState({ datasets: [], labels: [], apperiance: [] });

    useEffect(() => {
        // getUserByName(admin_username, setSnack).then((res) => setCurrentUser(res));
        getDefectsNumbers(setSnack).then((res) =>
            setCircleData(
                CircleData(res.OpenDefectsCount, res.ProccessDefectsCount, res.ClosedDefectsCount),
            ),
        );
    }, []);

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    barThickness: 12,
                    maxBarThickness: 10,
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
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
                        borderDashOffset: [2],
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
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

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <Card elevation={3}>
                        <CardContent>
                            <Box height={400} position='relative'>
                                <Bar data={CreateData} options={options} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <Card>
                        <CardHeader title='Кількість дефектів' />
                        <Divider />
                        <CardContent>
                            <Box height={300} position='relative'>
                                <Doughnut data={circleData} options={cirlceOptions} />
                            </Box>
                            <Box display='flex' justifyContent='center' mt={2}>
                                {circleData.apperiance.map(({ color, icon, title, value }) => (
                                    <Box key={title} p={1} textAlign='center'>
                                        {icon}
                                        <Typography color='textPrimary' variant='body1'>
                                            {title}
                                        </Typography>
                                        <Typography style={{ color }} variant='h2'>
                                            {value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <SnackbarHandler snack={snack} setSnack={setSnack} />
        </React.Fragment>
    );
}

export default Dashboard;
