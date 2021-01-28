import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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

function UpdateDialog({ open, setOpen, setUpdated, user }): JSX.Element {
    const classes = useStyles();

    const intialFormValues = {
        first_name: user.first_name,
        last_name: user.last_name === '' ? 'Прізвище відсутнє' : user.last_name,
        enabled: user.enabled,
        position: user.position,
    };
    const editValidationSchema = Yup.object().shape({
        first_name: Yup.string().min(5, "Надто коротке ім'я").max(50, "Надто довге ім'я"),
        last_name: Yup.string().min(5, 'Надто коротка назва').max(50, 'Надто довга назва'),
        enabled: Yup.string(),
        position: Yup.string(),
    });

    const closeModal = () => {
        setOpen(false);
    };
    const submit = (values) => {
        setUpdated({
            status: true,
            data: {
                id: user._id,
                values: { username: user.username, chat_id: user.chat_id, ...values },
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
                    }) => (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <DialogContent className={classes.DialogContent}>
                                <TextField
                                    autoFocus
                                    margin='dense'
                                    id='title'
                                    name='first_name'
                                    label="Ім'я"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name}
                                    helperText={touched.first_name ? errors.first_name : ''}
                                    error={touched.first_name && Boolean(errors.first_name)}
                                />
                                <TextField
                                    margin='dense'
                                    id='last_name'
                                    label='Прізвище'
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                    helperText={touched.last_name ? errors.last_name : ''}
                                    error={touched.last_name && Boolean(errors.last_name)}
                                />
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel id='status-label'>Доступ</InputLabel>
                                    <Select
                                        labelId='enabled-label'
                                        id='enabled'
                                        name='enabled'
                                        value={values.enabled}
                                        onBlur={handleBlur}
                                        onChange={handleChange}>
                                        <MenuItem value={'true'}>Активний</MenuItem>
                                        <MenuItem value={'false'}>Неактивний</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.enabled && touched.enabled ? (
                                    <div>{errors.enabled}</div>
                                ) : null}
                                <FormControl fullWidth margin='dense'>
                                    <InputLabel id='status-label'>Посада</InputLabel>
                                    <Select
                                        labelId='position-label'
                                        id='position'
                                        name='position'
                                        value={values.position}
                                        onBlur={handleBlur}
                                        onChange={handleChange}>
                                        <MenuItem value={'Cleaner'}>Санітарний працівник</MenuItem>
                                        <MenuItem value={'Repairer'}>Технічний працівник</MenuItem>
                                        <MenuItem value={'None'}>Посада відсутня</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.position && touched.position ? (
                                    <div>{errors.position}</div>
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
