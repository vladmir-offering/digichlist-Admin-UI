import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import styles from './UpdateDialog.module.css';
import DefectsContext from '../DefectsContext';

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
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
    const classes = useStyles();

    const intialFormValues = {
        title: defect.title,
        room: defect.room,
        status: defect.status,
        open_date: defect.open_date.substr(0, 10),
    };
    const editValidationSchema = Yup.object().shape({
        title: Yup.string().min(5, 'Надто короткий опис').max(50, 'Надто довгий опис'),
        room: Yup.string().min(3, 'Надто коротка назва').max(50, 'Надто довга назва'),
        status: Yup.string(),
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
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
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
                                <TextField
                                    fullWidth
                                    id='status'
                                    margin='dense'
                                    label='Cтатус'
                                    name='status'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.status}
                                    helperText={touched.status ? errors.status : ''}
                                    error={touched.status && Boolean(errors.status)}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify='space-around'>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant='inline'
                                            format='yyyy-MM-dd'
                                            margin='normal'
                                            id='date-picker-inline'
                                            label='Date picker inline'
                                            value={values.open_date}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardDatePicker
                                            margin='normal'
                                            id='date-picker-dialog'
                                            label='Date picker dialog'
                                            format='yyyy-MM-dd'
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardTimePicker
                                            margin='normal'
                                            id='time-picker'
                                            label='Time picker'
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
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
