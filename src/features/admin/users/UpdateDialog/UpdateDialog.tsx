import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import styles from './UpdateDialog.module.css';
import DefectsContext from '../UsersContext';

const useStyles = makeStyles({
    DialogContent: {
        '&:first-child': {
            paddingTop: '0',
        },
    },
    DialogActions: {
        padding: '1rem',
    },
});

function UpdateDialog({ open, setOpen, defect }): JSX.Element {
    const { setUpdated } = useContext(DefectsContext);
    const classes = useStyles();

    const intialFormValues = {
        title: defect.title,
        room: defect.room,
        status: defect.status,
        priority: defect.priority,
        open_date: defect.open_date,
    };
    const editValidationSchema = Yup.object().shape({
        title: Yup.string().min(5, 'Надто короткий опис').max(50, 'Надто довгий опис'),
        room: Yup.string().min(3, 'Надто коротка назва').max(50, 'Надто довга назва'),
        status: Yup.string(),
        priority: Yup.number(),
        open_date: Yup.date(),
    });

    const closeModal = () => {
        setOpen(false);
    };
    const submit = (values) => {
        setUpdated({
            status: true,
            data: {
                id: defect._id,
                values: { ...values },
                intialFormValues: { ...intialFormValues },
            },
        });
    };
    return (
        <React.Fragment>
            <Dialog open={open} onClose={closeModal} aria-labelledby='simple-dialog-title'>
                <DialogTitle className={styles.entityTitle}>Редагувати дефект</DialogTitle>
                <Formik
                    initialValues={intialFormValues}
                    validationSchema={editValidationSchema}
                    onSubmit={(values) => submit(values)}>
                    {({
                        isValid,
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <DialogContent className={classes.DialogContent}>
                                <TextField
                                    autoFocus
                                    margin='dense'
                                    id='title'
                                    label='Опис'
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    helperText={touched.title ? errors.title : ''}
                                    error={touched.title && Boolean(errors.title)}
                                />
                                <TextField
                                    margin='dense'
                                    id='room'
                                    label='Місце дефекту'
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.room}
                                    helperText={touched.room ? errors.room : ''}
                                    error={touched.room && Boolean(errors.room)}
                                />
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel id='status-label'>Cтатус</InputLabel>
                                    <Select
                                        labelId='status-label'
                                        id='status'
                                        name='status'
                                        value={values.status}
                                        onBlur={handleBlur}
                                        onChange={handleChange}>
                                        <MenuItem value={'open'}>Відкритий</MenuItem>
                                        <MenuItem value={'fixing'}>В процесі</MenuItem>
                                        <MenuItem value={'solved'}>Закритий</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.status && touched.status ? (
                                    <div>{errors.status}</div>
                                ) : null}
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel id='status-label'>Пріоритет</InputLabel>
                                    <Select
                                        labelId='status-label'
                                        id='priority'
                                        name='priority'
                                        value={values.priority}
                                        onBlur={handleBlur}
                                        onChange={handleChange}>
                                        <MenuItem value={1}>Терміновий</MenuItem>
                                        <MenuItem value={2}>Якнайшвидше</MenuItem>
                                        <MenuItem value={3}>Звичайний</MenuItem>
                                        <MenuItem value={4}>Відустній</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.status && touched.status ? (
                                    <div>{errors.status}</div>
                                ) : null}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant='inline'
                                        format='yyyy-MM-dd'
                                        margin='normal'
                                        id='date-picker-inline'
                                        label='Дата появи'
                                        name='open_date'
                                        value={values.open_date}
                                        onChange={(date) => setFieldValue('open_date', date)}
                                    />
                                </MuiPickersUtilsProvider>
                                {errors.open_date && touched.open_date ? (
                                    <div>{errors.open_date}</div>
                                ) : null}
                            </DialogContent>
                            <DialogActions className={classes.DialogActions}>
                                <Button onClick={closeModal}>Скасувати</Button>
                                <Button
                                    type='submit'
                                    disabled={!isValid}
                                    disableElevation
                                    variant='contained'
                                    color='primary'>
                                    Зберегти
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </React.Fragment>
    );
}

export default UpdateDialog;
