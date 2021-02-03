import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    useTheme,
    Typography,
    Button,
} from '@material-ui/core';

import { Bar, Doughnut } from 'react-chartjs-2';

import SnackbarHandler from '../../../common/components/Snackbar/snackbar';
import styles from './Dashboard.module.css';
import { getDefectsNumberByDateAndStatus, getDefectsNumbers } from './DashboardService';
import {
    BarDataCreate,
    DoughnutDataCreate,
    DoughnutDataOptions,
    BarDataOptions,
    DatePeriodType,
} from '../dashboard/DashboardModels';

function Dashboard(): JSX.Element {
    const theme = useTheme();
    const [snack, setSnack] = useState({ open: false, message: '', type: '' });
    const doughnutOptions = DoughnutDataOptions(theme);
    const barOptions = BarDataOptions(theme);
    const [doughnutData, setDoughnutData] = useState({ datasets: [], labels: [], apperiance: [] });
    const [barData, setBarData] = useState({ datasets: [], labels: [] } as any);
    const [filteredDate, setFilteredDate] = useState('yesterday' as DatePeriodType);

    useEffect(() => {
        getDefectsNumbers(setSnack).then((res) => setDoughnutData(DoughnutDataCreate(res)));
    }, []);
    useEffect(() => {
        getDefectsNumberByDateAndStatus(setSnack, filteredDate).then((res: any) =>
            setBarData(BarDataCreate(res)),
        );
    }, [filteredDate]);
    
    const ChangeFilteredDate = (date_type) => {
        setFilteredDate(date_type);
    };
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <Card elevation={3}>
                        <CardHeader
                            action={
                                <React.Fragment>
                                    <Button
                                        onClick={() => {
                                            ChangeFilteredDate('yesterday');
                                        }}
                                        className={styles.filterButton}
                                        size='small'
                                        variant='outlined'>
                                        За день
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            ChangeFilteredDate('lastweek');
                                        }}
                                        className={styles.filterButton}
                                        size='small'
                                        variant='outlined'>
                                        За тиждень
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            ChangeFilteredDate('lastmonth');
                                        }}
                                        className={styles.filterButton}
                                        size='small'
                                        variant='outlined'>
                                        За місяць
                                    </Button>
                                </React.Fragment>
                            }
                            title='Статистика дефектів за часом'
                        />
                        <Divider />
                        <CardContent>
                            <Box height={400} position='relative'>
                                <Bar data={barData} options={barOptions} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <Box display='flex' justifyContent='flex-end' p={2}>
                            <Button color='primary' size='small' variant='text'>
                                <Link to='/admin/defects'>Перейти</Link>
                            </Button>
                        </Box>
                    </Card>
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <Card>
                        <CardHeader title='Кількість дефектів' />
                        <Divider />
                        <CardContent>
                            <Box height={300} position='relative'>
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </Box>
                            <Box display='flex' justifyContent='center' mt={2}>
                                {doughnutData.apperiance.map(({ color, icon, title, value }) => (
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
