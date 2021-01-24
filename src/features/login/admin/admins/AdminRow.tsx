import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

const AdminRow = ({ adminData, id }) => {
    const { username, email } = adminData;
    const [edit, setEdit] = useState(false);
    const editSpecialityHandler = () => {
        // setEdit(true)
    };
    const deleteSpecialityHandler = () => {
        // deleteEntity('Speciality', speciality_id).then((res) => {
        //   if (res.data.response === 'ok') {
        //     const newArray = specialityDates.filter(
        //       (item) => item.speciality_id !== speciality_id
        //     )
        //     setSpecialityDate(newArray)
        //   }
        // })
    };
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <div>
                    <Button color='primary' onClick={editSpecialityHandler}>
                        <EditIcon />
                    </Button>
                    <Button color='primary' onClick={deleteSpecialityHandler}>
                        <DeleteIcon />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};
export default AdminRow;
