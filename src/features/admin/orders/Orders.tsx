import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormGroup,
} from '@material-ui/core';
import { List } from '@material-ui/icons';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircle from '@material-ui/icons/AddCircle';

import styles from './Orders.module.css';
import { getOrders, updateOrderData, delOrdersData } from './OrdersServise';
import OrderRow from './OrderRow';

import SnackbarHandler, { ISnackbar } from '../../../common/components/Snackbar/snackbar';

export const Orders = () => {
    type Admin = Array<{
        email: string;
        username: string;
        id: string;
        password: string;
        done: boolean;
    }>;

    const statuses: Array<string> = ['Активні', 'Завершені'];

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [ordersData, setOrderData] = useState<Admin | []>([]);
    const [ordersDataCopy, setOrderDataCopy] = useState<Admin | []>([]);
    const [open, setOpen] = useState(false);
    const [filterValue, setFilterValue] = useState(statuses[0]);

    const [editOrder, setEditOrder] = useState({
        edit: false,
        id: 0,
        data: {},
    });
    const [deleteOrder, setDeleteOrder] = useState({
        delete: false,
        id: 0,
    });
    const [snack, setSnack] = useState({ open: false, message: '', type: 'success' } as ISnackbar);

    useEffect(() => {
        (async function () {
            const response = await getOrders();
            if (Array.isArray(response)) {
                const newList = response.filter((item) => item.done === false);
                setOrderData(newList);
                setOrderDataCopy(response);
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
                const response = await updateOrderData(ordersDataCopy, editOrder);
                if (Array.isArray(response)) {
                    setOrderDataCopy(response);
                    filterOrdersHandler(response);
                    setOpen(false);
                    setSnack({
                        open: true,
                        message: 'Замовлення редаговано',
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

    useEffect(() => {
        (async function () {
            if (deleteOrder.delete) {
                const response = await delOrdersData(deleteOrder.id, ordersDataCopy);
                if (Array.isArray(response)) {
                    setOrderDataCopy(response);
                    filterOrdersHandler(response);
                    setPage(0);
                    setSnack({
                        open: true,
                        message: 'Замовлення видалено',
                        type: 'success',
                    });
                } else {
                    setOpen(false);
                    setSnack({
                        open: true,
                        message: response.err,
                        type: 'error',
                    });
                }
            }
        })();
    }, [deleteOrder]);

    useEffect(() => {
        filterOrdersHandler(ordersDataCopy);
    }, [filterValue]);

    const filterOrdersHandler = (data) => {
        if (filterValue === 'Активні') {
            const newList = data.filter((item) => item.done === false);
            setOrderData(newList);
        } else if (filterValue === 'Завершені') {
            const newList = data.filter((item) => item.done === true);
            setOrderData(newList);
        }
    };

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

    const handleChangeStatusFilter = (event) => {
        setFilterValue(event.target.value);
    };

    const fieldsName = ['№', 'Назва', 'Кількість', 'Дата', "Ім'я користувача", 'Статус'];
    return loading ? (
        <div className={styles.loader}>
            <CircularProgress size={70} />
        </div>
    ) : (
        <div>
            <div className={styles.entityHeader}>
                <Typography
                    component='h2'
                    variant='h4'
                    color='textPrimary'
                    className={styles.entityHeaderTitle}>
                    <List fontSize='large' />
                    Замовлення
                </Typography>
                <FormGroup row className={styles.formGroup}>
                    <span style={{ width: '1px', margin: '0 1rem' }} />
                    <FormControl className={styles.formControl}>
                        <InputLabel id='status-filter'>Статус</InputLabel>
                        <Select
                            labelId='status-filter'
                            id='status-filter-select'
                            value={filterValue}
                            onChange={handleChangeStatusFilter}>
                            {statuses.map((filter) => (
                                <MenuItem key={filter} value={filter}>
                                    {filter}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormGroup>
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
                                    setDeleteOrder={setDeleteOrder}
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
