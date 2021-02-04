import React from 'react';
import { TableCell, TableRow, Button, Tooltip } from '@material-ui/core';
import { Edit, Delete, CheckCircle } from '@material-ui/icons';

import styles from './UsersTable.module.css';
import DeleteDialog from '../../../../common/components/DeleteDialog/DeleteDialog';
import UpdateDialog from '../UpdateDialog/UpdateDialog';
import Status from '../../../../common/components/Status/Status';
import { StylizePosition, SurnameCheck } from '../UsersService';

function DefectsTableRow({ user, index, setEnabled, setDeleted, setUpdated }): JSX.Element {
    const [update, setUpdate] = React.useState(false);
    const [del, setDel] = React.useState(false);
    const position = StylizePosition(user.position);
    const surname = SurnameCheck(user.last_name);

    const checkHandler = () => {
        setEnabled({ status: true, data: { ...user }, value: true });
    };
    const openModal = (mode) => {
        switch (mode) {
            case 'update':
                setUpdate(true);
                break;
            case 'delete':
                setDel(true);
                break;
        }
    };
    return (
        <TableRow hover role='checkbox' tabIndex={-1}>
            <TableCell>{index}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>
                {user.first_name + ' '}
                {surname}
            </TableCell>
            <TableCell>{position}</TableCell>
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
            <UpdateDialog open={update} setOpen={setUpdate} setUpdated={setUpdated} user={user} />
            <DeleteDialog
                title='користувача'
                open={del}
                setOpen={setDel}
                id={user._id}
                setDeleted={setDeleted}
            />
        </TableRow>
    );
}

export default DefectsTableRow;
