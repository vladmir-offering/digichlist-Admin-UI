import React from 'react';
import { TableCell, TableRow, Button, Tooltip } from '@material-ui/core';
import { Edit, Delete, Description, CheckCircle } from '@material-ui/icons';

import styles from './DefectsTable.module.css';
import { Defect } from '../models/DefectsModels';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import InfoDialog from '../InfoDialog/InfoDialog';
import UpdateDialog from '../UpdateDialog/UpdateDialog';
import Status from './Status';

function DefectsTableRow({ defect, index, setStatus }): JSX.Element {
    const [update, setUpdate] = React.useState(false);
    const [info, setInfo] = React.useState(false);
    const [del, setDel] = React.useState(false);

    const checkHandler = () => {
        setStatus({ status: true, data: { ...defect }, value: 'solved' });
    };

    const openModal = (mode) => {
        switch (mode) {
            case 'update':
                setUpdate(true);
                break;
            case 'info':
                setInfo(true);
                break;
            case 'delete':
                setDel(true);
                break;
        }
    };

    return (
        <TableRow hover role='checkbox' tabIndex={-1}>
            <TableCell>{index}</TableCell>
            <TableCell>{defect.title}</TableCell>
            <TableCell>{defect.room}</TableCell>
            <TableCell align='center'>
                <Status status={defect.status} />
            </TableCell>
            <TableCell align='center'>
                <Tooltip title='Детальніша інформація' arrow>
                    <Button
                        onClick={() => openModal('info')}
                        disableElevation
                        variant='contained'
                        className={styles.button}
                        color='primary'>
                        <Description />
                    </Button>
                </Tooltip>
                <Tooltip title='Позначити виконаним' arrow>
                    <Button
                        onClick={checkHandler}
                        disableElevation
                        variant='contained'
                        className={styles.button}
                        color='primary'>
                        <CheckCircle />
                    </Button>
                </Tooltip>
                <Tooltip title='Оновити' arrow>
                    <Button
                        disableElevation
                        variant='contained'
                        className={styles.button}
                        color='primary'
                        onClick={() => openModal('update')}>
                        <Edit />
                    </Button>
                </Tooltip>
                <Tooltip title='Видалити' arrow>
                    <Button
                        onClick={() => openModal('delete')}
                        disableElevation
                        variant='contained'
                        className={styles.button}
                        color='primary'>
                        <Delete />
                    </Button>
                </Tooltip>
            </TableCell>
            <UpdateDialog open={update} setOpen={setUpdate} defect={defect} />
            <InfoDialog open={info} setOpen={setInfo} defect={defect} />
            <DeleteDialog open={del} setOpen={setDel} id={defect._id} />
        </TableRow>
    );
}

export default DefectsTableRow;
