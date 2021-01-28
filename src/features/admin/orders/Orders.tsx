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

import styles from './Orders.module.css';
import { getOrders, updateOrderData } from './OrdersServise';
import OrderRow from './OrderRow';

import SnackbarHandler from '../../../common/components/Snackbar/snackbar';

export const Orders = () => {
    type Admin = Array<{
        email: string;
        username: string;
        id: string;
        password: string;
    }>;

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [ordersData, setOrderData] = useState<Admin | []>([]);
    const [open, setOpen] = useState(false);

    const [editOrder, setEditOrder] = useState({
        edit: false,
        id: 0,
        data: {},
    });

    const [snack, setSnack] = useState({ open: false, message: '', type: 'success' });
    useEffect(() => {
        (async function () {
            const response = await getOrders();
            if (typeof response === 'object') {
                setOrderData(response.data.orders);
                setLoading(false);
                setSnack({
                    open: true,
                    message: 'Замовлення успішно завантажені',
                    type: 'success',
                });
            } else {
                setSnack({
                    open: true,
                    message: 'Сталася помилка при завантажені',
                    type: 'error',
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            if (editOrder.edit) {
                const response = await updateOrderData(ordersData, editOrder);
                if (Array.isArray(response)) {
                    setOrderData(response);
                    setOpen(false);
                    setSnack({
                        open: true,
                        message: 'Групу редаговано',
                        type: 'success',
                    });
                } else {
                    setSnack({
                        open: true,
                        message: response.err,
                        type: 'error',
                    });
                    setOpen(false);
                }
            }
        })();
    }, [editOrder]);

    const dialogOpenHandler = () => {
        setOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fieldsName = ['№', 'Назва', 'Кількість', 'Дата', 'Примітка', 'Статус'];
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
                    Замовлення
                </Typography>
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
                        {ordersData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((orderData, index) => (
                                <OrderRow
                                    orderData={orderData}
                                    key={uuidv4()}
                                    id={index}
                                    setEditOrder={setEditOrder}
                                />
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component='div'
                    count={ordersData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
            <SnackbarHandler snack={snack} setSnack={setSnack} />
        </div>
    );
};
