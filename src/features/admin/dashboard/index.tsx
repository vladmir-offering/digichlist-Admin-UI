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
import Loader from '../../../common/components/Loader/Loader';
import styles from './Dashboard.module.css';
import { getDefectsNumberByDateAndStatus, getDefectsNumbers } from './DashboardService';
import {
    BarDataCreate,
    DoughnutDataCreate,
    DoughnutDataOptions,
    BarDataOptions,
    DatePeriodType,
} from '../dashboard/DashboardModels';
import DoughnutCard from './DoughnutCard';
import BarCard from './BarCard';

function Dashboard(): JSX.Element {
    const theme = useTheme();
    const [snack, setSnack] = useState({ open: false, message: '', type: '' });
    const doughnutOptions = DoughnutDataOptions(theme);
    const barOptions = BarDataOptions(theme);
    const [doughnutData, setDoughnutData] = useState({ datasets: [], labels: [], apperiance: [] });
    const [barData, setBarData] = useState({ datasets: [], labels: [] } as any);
    const [filteredDate, setFilteredDate] = useState('yesterday' as DatePeriodType);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getDefectsNumbers(setSnack).then((res) => setDoughnutData(DoughnutDataCreate(res)));
    }, []);
    useEffect(() => {
        getDefectsNumberByDateAndStatus(setSnack, filteredDate).then((res: any) => {
            setLoaded(true);
            setBarData(BarDataCreate(res));
        });
    }, [filteredDate]);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <BarCard
                        loaded={loaded}
                        barData={barData}
                        barOptions={barOptions}
                        setFilteredDate={setFilteredDate}
                    />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <DoughnutCard
                        loaded={loaded}
                        doughnutData={doughnutData}
                        doughnutOptions={doughnutOptions}
                    />
                </Grid>
            </Grid>
            <SnackbarHandler snack={snack} setSnack={setSnack} />
        </React.Fragment>
    );
}

export default Dashboard;
