import React, { useEffect, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { Group } from '@material-ui/icons';

import SnackbarHandler from '../../../../common/components/Snackbar/snackbar';
import Loader from '../../../../common/components/Loader/Loader';
import UsersTableRow from './UsersTableRow';

import styles from './UsersTable.module.css';
import {
    getUsers,
    deleteModeSubmit,
    updateModeSubmit,
    FilterByAccess,
    FilterByPosition,
    checkModeSumbit,
} from '../UsersService';
import { columns, accesses, positions } from '../UsersModels';

function UsersTable(): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', type: '' });
    const [dataSource, setDataSource] = useState(Array);
    const [FilteredDataSource, setFilteredDataSource] = useState(Array);
    const [loaded, setLoaded] = useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [deleted, setDeleted] = React.useState({ status: false, id: '' });
    const [updated, setUpdated] = React.useState({ status: false, data: {} });
    const [enabled, setEnabled] = React.useState({ status: false, data: {}, value: 'none' });
    const [AccessFilter, setAccessFilter] = React.useState(accesses[0].value);
    const [PositionFilter, setPositionFilter] = React.useState(positions[0].value);

    const closeModal = (): void => {
        setOpen(false);
    };

    useEffect(() => {
        getUsers().then((res) => {
            setLoaded(true);
            setDataSource(res.users);
            setFilteredDataSource(res.users);
        });
    }, []);
    //*Operations
    useEffect(() => {
        if (deleted.status) {
            deleteModeSubmit(deleted.id, setSnack, setDataSource, closeModal);
        }
    }, [deleted]);

    useEffect(() => {
        if (updated.status) {
            updateModeSubmit(updated.data, setSnack, setDataSource, closeModal);
        }
    }, [updated]);

    useEffect(() => {
        if (enabled.status) {
            checkModeSumbit(enabled.data, enabled.value, setSnack, setDataSource);
        }
    }, [enabled]);

    //*Filters
    useEffect(() => {
        FilterByAccess(AccessFilter, FilteredDataSource, setDataSource, setFilteredDataSource);
    }, [AccessFilter]);
    useEffect(() => {
        FilterByPosition(PositionFilter, FilteredDataSource, setDataSource, setFilteredDataSource);
    }, [PositionFilter]);

    const handleChangePage = (event, newPage): void => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event): void => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangeAccessFilter = (event) => {
        setAccessFilter(event.target.value);
    };
    const handleChangePostionFilter = (event) => {
        setPositionFilter(event.target.value);
    };
    return (
        <React.Fragment>
            {loaded ? (
                <React.Fragment>
                    <div className={styles.entityHeader}>
                        <Typography
                            component='h2'
                            variant='h4'
                            color='textPrimary'
                            className={styles.entityHeaderTitle}>
                            <Group fontSize='large' />
                            Список користувачів
                        </Typography>
                        <FormGroup row className={styles.formGroup}>
                            <Typography style={{ color: 'rgba(111, 111, 111, 0.87)' }}>
                                Виберіть один із фільтрів
                            </Typography>
                            <span style={{ width: '1px', margin: '0 1rem' }} />
                            <FormControl className={styles.formControl}>
                                <InputLabel id='access-filter'>Фільтр доступу</InputLabel>
                                <Select
                                    labelId='access-filter'
                                    id='access-filter-select'
                                    value={AccessFilter}
                                    onChange={handleChangeAccessFilter}>
                                    {accesses.map((filter) => (
                                        <MenuItem key={filter.value} value={filter.value}>
                                            {filter.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={styles.formControl}>
                                <InputLabel id='position-filter'>Фільтри по посаді</InputLabel>
                                <Select
                                    labelId='position-filter'
                                    id='position-filter-select'
                                    value={PositionFilter}
                                    onChange={handleChangePostionFilter}>
                                    {positions.map((filter) => (
                                        <MenuItem key={filter.value} value={filter.value}>
                                            {filter.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormGroup>
                    </div>
                    <Paper elevation={6}>
                        <TableContainer className={styles.entityTableContainer}>
                            <Table stickyHeader className={styles.entityTable}>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={uuidv4()}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataSource
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((user, index) => {
                                            return (
                                                <UsersTableRow
                                                    key={uuidv4()}
                                                    index={index + 1}
                                                    user={user}
                                                    setEnabled={setEnabled}
                                                    setDeleted={setDeleted}
                                                    setUpdated={setUpdated}
                                                />
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            labelRowsPerPage='К-сть рядків'
                            component='div'
                            count={dataSource.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <SnackbarHandler snack={snack} setSnack={setSnack} />
                </React.Fragment>
            ) : (
                <Loader />
            )}
        </React.Fragment>
    );
}

export default UsersTable;
