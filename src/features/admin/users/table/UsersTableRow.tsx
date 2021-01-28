import React from 'react';
import { TableCell, TableRow, Button, Tooltip } from '@material-ui/core';
import { Edit, Delete, Description, CheckCircle } from '@material-ui/icons';

import styles from './UsersTable.module.css';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import InfoDialog from '../InfoDialog/InfoDialog';
import UpdateDialog from '../UpdateDialog/UpdateDialog';
import Status from '../../../../common/components/Status/Status';

function DefectsTableRow({ user, index, setStatus }): JSX.Element {
    const [update, setUpdate] = React.useState(false);
    const [info, setInfo] = React.useState(false);
    const [del, setDel] = React.useState(false);

    const checkHandler = () => {
        setStatus({ status: true, data: { ...user }, value: true });
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
            <TableCell>{user.first_name + ' ' + user.last_name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.position}</TableCell>
            <TableCell align='center'>
                <Status status={user.enabled} />
            </TableCell>
            <TableCell align='center'>
                <Tooltip title='Активувати' arrow>
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
            {/* <UpdateDialog open={update} setOpen={setUpdate} user={user} />
            <InfoDialog open={info} setOpen={setInfo} user={user} />
            <DeleteDialog open={del} setOpen={setDel} id={user._id} /> */}
        </TableRow>
    );
}

export default DefectsTableRow;
