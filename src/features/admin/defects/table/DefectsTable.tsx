import React, { useContext, useEffect, useState } from 'react';
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
import { NotificationImportant } from '@material-ui/icons';

import SnackbarHandler from '../../../../common/components/Snackbar/snackbar';
import Loader from '../../../../common/components/Loader/Loader';
import DefectsTableRow from './DefectsTableRow';

import {
    getDefects,
    deleteModeSubmit,
    updateModeSubmit,
    checkModeSumbit,
    FilterByStatus,
    FilterByPriority,
} from '../DefectsService';
import styles from './DefectsTable.module.css';
import { columns, statuses, priorities } from '../models/DefectsModels';
import DefectsContext from '../DefectsContext';
import UserContext from '../../../login/UserContext';

function DefectsTable(): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [admin_username, setAdminUserName] = useState(localStorage.getItem('admin_username'));
    const [snack, setSnack] = useState({ open: false, message: '', type: '' });
    const [dataSource, setDataSource] = useState(Array);
    const [FilteredDataSource, setFilteredDataSource] = useState(Array);
    const [loaded, setLoaded] = useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [deleted, setDeleted] = React.useState({ status: false, id: '' });
    const [updated, setUpdated] = React.useState({ status: false, data: {} });
    const [status, setStatus] = React.useState({ status: false, data: {}, value: 'none' });
    const [StatusFilter, setStatusFilter] = React.useState(statuses[0].value);
    const [PriorityFilter, setPriorityFilter] = React.useState(priorities[0].value);

    const closeModal = (): void => {
        setOpen(false);
    };

    useEffect(() => {
        getDefects().then((res) => {
            setLoaded(true);
            setDataSource(res.defects);
            setFilteredDataSource(res.defects);
        });
    }, []);

    useEffect(() => {
        if (deleted.status) {
            deleteModeSubmit(deleted.id, setSnack, setDataSource, closeModal);
        }
    }, [deleted]);

    useEffect(() => {
        if (updated.status) {
            updateModeSubmit(updated.data, admin_username, setSnack, setDataSource, closeModal);
        }
    }, [updated]);

    useEffect(() => {
        if (status.status) {
            checkModeSumbit(status.data, admin_username, status.value, setSnack, setDataSource);
        }
    }, [status]);

    //Filters
    useEffect(() => {
        FilterByStatus(StatusFilter, FilteredDataSource, setDataSource);
    }, [StatusFilter]);
    useEffect(() => {
        FilterByPriority(PriorityFilter, FilteredDataSource, setDataSource);
    }, [PriorityFilter]);
    //

    const handleChangePage = (event, newPage): void => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event): void => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangeStatusFilter = (event) => {
        setStatusFilter(event.target.value);
    };
    const handleChangePriorityFilter = (event) => {
        setPriorityFilter(event.target.value);
    };
    return (
        <DefectsContext.Provider value={{ setDeleted, setUpdated }}>
            {loaded ? (
                <React.Fragment>
                    <div className={styles.entityHeader}>
                        <Typography
                            component='h2'
                            variant='h4'
                            color='textPrimary'
                            className={styles.entityHeaderTitle}>
                            <NotificationImportant fontSize='large' />
                            Список дефектів
                        </Typography>
                        <FormGroup row className={styles.formGroup}>
                            <Typography style={{ color: 'rgba(111, 111, 111, 0.87)' }}>
                                Виберіть один із фільтрів
                            </Typography>
                            <span style={{ width: '1px', margin: '0 1rem' }} />
                            <FormControl className={styles.formControl}>
                                <InputLabel id='status-filter'>Фільтри по статусу</InputLabel>
                                <Select
                                    labelId='status-filter'
                                    id='status-filter-select'
                                    value={StatusFilter}
                                    onChange={handleChangeStatusFilter}>
                                    {statuses.map((filter) => (
                                        <MenuItem key={filter.value} value={filter.value}>
                                            {filter.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={styles.formControl}>
                                <InputLabel id='status-filter'>Фільтри по пріоритету</InputLabel>
                                <Select
                                    labelId='status-filter'
                                    id='status-filter-select'
                                    value={PriorityFilter}
                                    onChange={handleChangePriorityFilter}>
                                    {priorities.map((filter) => (
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
                                        .map((defect, index) => {
                                            return (
                                                <DefectsTableRow
                                                    key={uuidv4()}
                                                    index={index + 1}
                                                    defect={defect}
                                                    setStatus={setStatus}
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
        </DefectsContext.Provider>
    );
}

export default DefectsTable;
