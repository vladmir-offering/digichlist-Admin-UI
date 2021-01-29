import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import ConfirmDelete from './ConfirmDelete';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const OrderRow = ({ orderData, id, setEditOrder }) => {
    const classes = useStyles();

    const { title, done, note, date, quantity, username } = orderData;
    const [selectValue, setSelectValue] = useState(done);

    const [openDel, setOpenDel] = useState(false);

    const dialogOpenDelHandler = () => {
        setOpenDel(true);
    };

    const handleChange = (event) => {
        setSelectValue(!selectValue);
        setEditOrder({ edit: true, id: username, data: orderData });
    };
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{new Date(date).toISOString().substring(0, 10)}</TableCell>
            <TableCell>
                <Button variant='contained' disabled={!note} onClick={dialogOpenDelHandler}>
                    Переглянути
                </Button>
            </TableCell>
            <TableCell>
                <FormControl className={classes.formControl}>
                    <Select
                        id='demo-simple-select'
                        value={selectValue}
                        displayEmpty
                        onChange={handleChange}>
                        <MenuItem value={selectValue}>
                            {selectValue ? 'Виконано' : 'В обробці'}
                        </MenuItem>
                        <MenuItem>{!selectValue ? 'Виконано' : 'В обробці'}</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            {openDel ? (
                <ConfirmDelete open={openDel} setShowDelDialog={setOpenDel} info={note} />
            ) : null}{' '}
        </TableRow>
    );
};
export default OrderRow;
