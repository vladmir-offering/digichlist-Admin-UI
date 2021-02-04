import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
} from '@material-ui/core';
import styles from './Dashboard.module.css';
import { Bar } from 'react-chartjs-2';

function BarCard({ loaded, barData, barOptions, setFilteredDate }: any): JSX.Element {
    const ChangeFilteredDate = (date_type) => {
        setFilteredDate(date_type);
    };
    return (
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
                    {loaded ? (
                        <Bar data={barData} options={barOptions} />
                    ) : (
                        <CircularProgress
                            style={{ position: 'absolute', top: '50%', left: '50%' }}
                        />
                    )}
                </Box>
            </CardContent>
            <Divider />
            <Box display='flex' justifyContent='flex-end' p={2}>
                <Button color='primary' size='small' variant='text'>
                    <Link to='/admin/defects'>Перейти</Link>
                </Button>
            </Box>
        </Card>
    );
}

export default BarCard;
