import React from 'react';

import {
    Card,
    CardHeader,
    Divider,
    CardContent,
    Box,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

function DoughnutCard({ loaded, doughnutData, doughnutOptions }: any): JSX.Element {
    return (
        <Card>
            <CardHeader title='Кількість дефектів' />
            <Divider />
            <CardContent>
                <Box height={300} position='relative'>
                    {loaded ? (
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    ) : (
                        <CircularProgress
                            style={{ position: 'absolute', top: '50%', left: '45%' }}
                        />
                    )}
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
    );
}

export default DoughnutCard;
