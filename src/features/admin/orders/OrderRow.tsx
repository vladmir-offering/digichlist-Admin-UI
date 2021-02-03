import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDelete from './ConfirmDelete';
import ExtraInfo from './ExtraInfo';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: theme.spacing(1),
        minWidth: 120,
    },
    del: {
        cursor: 'pointer',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
    },
    infoBtn: {
        '&:hover': {
            cursor: 'pointer',
            color: 'red',
        },
    },
}));

const OrderRow = ({ orderData, id, setEditOrder, setDeleteOrder }) => {
    const classes = useStyles();
    const { title, done, note, date, quantity, _id, username } = orderData;
    const [selectValue, setSelectValue] = useState(done);

    const [openInfo, setOpenInfo] = useState(false);
    const [openDel, setOpenDel] = useState(false);

    const dialogOpenInfoHandler = () => {
        setOpenInfo(true);
    };
    const dialogOpenDelHandler = () => {
        setOpenDel(true);
    };

    const handleChange = (event) => {
        setSelectValue(!selectValue);
        setEditOrder({ edit: true, id: _id, data: orderData });
    };
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>
                <div className={classes.info}>
                    {title}
                    {note !== 'No description provided' ? (
                        <InfoOutlinedIcon
                            className={classes.infoBtn}
                            onClick={dialogOpenInfoHandler}
                        />
                    ) : null}
                </div>
            </TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{new Date(date).toISOString().substring(0, 10)}</TableCell>
            <TableCell>
                {username}
                {/* <Button variant='contained' disabled={note !== 'No description provided'} onClick={dialogOpenInfoHandler}>
                    Переглянути
                </Button> */}
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
                    {selectValue ? (
                        <DeleteIcon className={classes.del} onClick={dialogOpenDelHandler} />
                    ) : null}
                </FormControl>
            </TableCell>
            {openInfo ? (
                <ExtraInfo open={openInfo} setShowInfoDialog={setOpenInfo} info={note} />
            ) : null}
            {openDel ? (
                <ConfirmDelete
                    open={openDel}
                    setShowDelDialog={setOpenDel}
                    id={_id}
                    setDeleteOrder={setDeleteOrder}
                />
            ) : null}
        </TableRow>
    );
};
export default OrderRow;
