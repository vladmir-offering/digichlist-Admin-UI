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
    Chip,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { NotificationImportant } from '@material-ui/icons';

import { getDefects, deleteModeSubmit, updateModeSubmit, checkModeSumbit } from '../DefectsService';
import DefectsTableRow from './DefectsTableRow';
import styles from './DefectsTable.module.css';
import { columns, filters } from '../models/DefectsModels';
import SnackbarHandler from '../../../../common/components/Snackbar/snackbar';
import Loader from '../../../../common/components/Loader/Loader';

import DefectsContext from '../DefectsContext';

function DefectsTable(): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [snack, setSnack] = useState({ open: false, message: '', type: '' });
    const [dataSource, setDataSource] = useState(Array);
    const [FilteredDataSource, setFilteredDataSource] = useState(Array);
    const [loaded, setLoaded] = useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [deleted, setDeleted] = React.useState({ status: false, id: '' });
    const [updated, setUpdated] = React.useState({ status: false, data: {} });
    const [status, setStatus] = React.useState({ status: false, body: {}, value: 'none' });
    const [filter, setFilter] = React.useState(filters[0].value);

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
            updateModeSubmit(updated.data, setSnack, setDataSource, closeModal);
        }
    }, [updated]);

    useEffect(() => {
        if (status.status) {
            checkModeSumbit(status.body, status.value, setSnack, setDataSource);
        }
    }, [status]);
    useEffect(() => {
        switch (filter) {
            case 'all':
                setDataSource(FilteredDataSource);
                break;
            case 'open':
                setDataSource(FilteredDataSource.filter((item: any) => item.status === filter));
                break;
            case 'fixing':
                setDataSource(FilteredDataSource.filter((item: any) => item.status === filter));
                break;
            case 'solved':
                setDataSource(FilteredDataSource.filter((item: any) => item.status === filter));
                break;
            default:
                setDataSource(FilteredDataSource);
        }
    }, [filter]);

    const handleChangePage = (event, newPage): void => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event): void => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangeStatusFilter = (event) => {
        setFilter(event.target.value);
    };
    return (
        <DefectsContext.Provider value={{ setDeleted, setUpdated, setStatus }}>
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
                        <FormControl className={styles.formControl}>
                            <InputLabel id='status-filter'>Фільтри по статусу</InputLabel>
                            <Select
                                labelId='status-filter'
                                id='status-filter-select'
                                value={filter}
                                onChange={handleChangeStatusFilter}>
                                {filters.map((filter) => (
                                    <MenuItem key={filter.value} value={filter.value}>
                                        <Chip style={filter.style} label={filter.title} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
