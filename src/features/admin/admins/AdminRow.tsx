import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

import ConfirmDelete from './ConfirmDelete';
import AdminAddDialog from './AdminAddDialog';
import styles from './Admins.module.css';

const AdminRow = ({ adminData, id, setDeleteAdmin, setEditAdmin }) => {
    const { username, email, _id } = adminData;
    const [edit, setEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);

    const dialogOpenHandler = () => {
        setEdit(true);
    };

    const dialogOpenDelHandler = () => {
        setOpenDel(true);
    };
    return (
        <TableRow>
            <TableCell>{id + 1}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <div>
                    <Button
                        color='primary'
                        variant='contained'
                        className={styles.button}
                        onClick={dialogOpenHandler}>
                        <EditIcon />
                    </Button>
                    <Button
                        color='primary'
                        variant='contained'
                        className={styles.button}
                        onClick={dialogOpenDelHandler}>
                        <DeleteIcon />
                    </Button>
                </div>
            </TableCell>
            {openDel ? (
                <ConfirmDelete
                    open={openDel}
                    setShowDelDialog={setOpenDel}
                    id={_id}
                    setDeleteAdmin={setDeleteAdmin}
                />
            ) : null}
            {edit ? (
                <AdminAddDialog
                    open={edit}
                    setOpen={setEdit}
                    setAddAdmin={null}
                    admin={adminData}
                    setEdit={setEdit}
                    setEditAdmin={setEditAdmin}
                />
            ) : null}
        </TableRow>
    );
};
export default AdminRow;
