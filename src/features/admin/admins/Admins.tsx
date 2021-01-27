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

import styles from './Admins.module.css';
import { getAdmins, addAdminData, deleteAdminData, updateAdminData } from './AdminsServise';
import AdminRow from './AdminRow';
import AdminAddDialog from './AdminAddDialog';

import SnackbarHandler from '../../../common/components/Snackbar/snackbar';

export const Admins = () => {
    type Admin = Array<{
        email: string;
        username: string;
        id: string;
        password: string;
    }>;

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [adminsData, setAdminsData] = useState<Admin | []>([]);
    const [open, setOpen] = useState(false);

    const [addAdmin, setAddAdmin] = useState({
        add: false,
        data: {},
    });

    const [editAdmin, setEditAdmin] = useState({
        edit: false,
        data: {},
        editId: 0,
        isChanged: false,
    });

    const [deleteAdmin, setDeleteAdmin] = useState({
        delete: false,
        id: 0,
    });
    const [snack, setSnack] = useState({ open: false, message: '', type: 'success' });
    useEffect(() => {
        (async function () {
            const response = await getAdmins();
            if (typeof response === 'object') {
                setAdminsData(response.data.admins);
                setLoading(false);
                setSnack({
                    open: true,
                    message: 'Адміни успішно завантажені',
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
            if (addAdmin.add) {
                const response = await addAdminData(addAdmin.data);
                if (!response.err) {
                    setAdminsData([...adminsData, response]);
                    setOpen(false);
                    setPage(Math.floor((adminsData.length - 1) / rowsPerPage));
                    setSnack({
                        open: true,
                        message: 'Адміністратора додано',
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
    }, [addAdmin]);

    useEffect(() => {
        (async function () {
            if (deleteAdmin.delete) {
                const response = await deleteAdminData(deleteAdmin.id, adminsData);
                if (Array.isArray(response)) {
                    setAdminsData(response);
                    setPage(Math.ceil((adminsData.length - 1) / rowsPerPage) - 1);
                    setSnack({
                        open: true,
                        message: 'Адміністратора видалено',
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
    }, [deleteAdmin]);

    useEffect(() => {
        (async function () {
            if (!editAdmin.isChanged && editAdmin.edit) {
                setSnack({
                    open: true,
                    message: 'Нічого не змінено',
                    type: 'info',
                });
            } else {
                if (editAdmin.edit) {
                    const response = await updateAdminData(adminsData, editAdmin);
                    if (Array.isArray(response)) {
                        setAdminsData(response);
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
            }
        })();
    }, [editAdmin]);

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
                    onClick={dialogOpenHandler}
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
                                <AdminRow
                                    adminData={adminData}
                                    key={uuidv4()}
                                    id={index}
                                    setEditAdmin={setEditAdmin}
                                    setDeleteAdmin={setDeleteAdmin}
                                />
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
            <SnackbarHandler snack={snack} setSnack={setSnack} />
            <AdminAddDialog
                open={open}
                setOpen={setOpen}
                setAddAdmin={setAddAdmin}
                admin={null}
                setEdit={null}
                setEditAdmin={null}
            />
        </div>
    );
};
