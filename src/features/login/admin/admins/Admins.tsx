import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircle from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

import styles from './Admins.module.css';
import { getAdmins } from './AdminsServise';
import AdminRow from './AdminRow';
export const Admins = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [adminsData, setAdminsData] = useState([]);
    const [snack, setSnack] = useState({ open: false, message: '', type: 'success' });
    useEffect(() => {
        (async function () {
            const response = await getAdmins();
            if (typeof response === 'object') {
                setAdminsData(response.data.admins);
                setLoading(false);
            }
        })();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fieldsName = ['№', "Ім'я", 'Пошта', 'Дії'];
    return loading ? (
        <div className={styles.loader}>
            <CircularProgress />
        </div>
    ) : (
        <div>
            <div className={styles.entityHeader}>
                <Typography
                    component='h2'
                    variant='h4'
                    color='textPrimary'
                    className={styles.entityHeaderTitle}>
                    {'Адміністратори'}
                </Typography>
                <Button
                    // onClick={dialogOpenHandler}
                    disableElevation
                    variant='contained'
                    color='primary'
                    className={styles.entityHeaderButton}>
                    <AddCircle />
                    {'Додати адміна'}
                </Button>
            </div>
            <div style={{ boxShadow: '0.5rem 1rem 2rem gray' }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {fieldsName.map((elem) => (
                                <TableCell key={uuidv4()}>{elem}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminsData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((adminData, index) => (
                                <AdminRow adminData={adminData} key={uuidv4()} id={index} />
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component='div'
                    count={adminsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};
