import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik';

import * as Yup from 'yup';

const AdminAddDialog = ({ open, setOpen, admin, setEdit, setAddAdmin, setEditAdmin }) => {
    const initialValues = {
        username: admin ? admin.username : '',
        email: admin ? admin.email : '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = admin
        ? Yup.object({
              username: Yup.string()
                  .matches(
                      /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                      `Введіть інше ім'я`,
                  )
                  .required('Заповни поле')
                  .min(5, "Коротке ім'я")
                  .max(20, "Задовге ім'я"),
              email: Yup.string().email('Введіть коректну пошту').required('Заповни поле'),
              password: Yup.string()
                  .min(8, 'Мінімум 8 символів')
                  .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      'Невідповідний пароль',
                  ),
              confirmPassword: Yup.string().oneOf(
                  [Yup.ref('password'), null],
                  'Паролі не співпадають',
              ),
          })
        : Yup.object({
              username: Yup.string()
                  .matches(
                      /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                      "Введіть інше ім'я",
                  )
                  .required('Заповни поле')
                  .min(5, "Коротке ім'я")
                  .max(20, "Задовге ім'я"),
              email: Yup.string().email('Введіть коректну пошту').required('Заповни поле'),
              password: Yup.string()
                  .required('Заповни поле')
                  .min(8, 'Мінімум 8 символів')
                  .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      'Невідповідний пароль',
                  ),
              confirmPassword: Yup.string().oneOf(
                  [Yup.ref('password'), null],
                  'Паролі не співпадають',
              ),
          });
    const handleClose = () => {
        admin ? setEdit(false) : setOpen(false);
    };

    const compareObj = (x, y) => {
        let isEqual = true;
        for (const prop in x) {
            if (x[prop] !== y[prop]) {
                isEqual = false;
                break;
            }
        }
        return isEqual;
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                id='form-dialog'
                aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>
                    {admin ? 'Редагувати' : 'Добавити'}
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        validateOnMount={true}
                        onSubmit={(data) => {
                            if (admin) {
                                if (
                                    compareObj(
                                        {
                                            username: admin.username,
                                            email: admin.email,
                                            password: admin.password,
                                        },
                                        (data =
                                            data.password === ''
                                                ? { ...data, password: admin.password }
                                                : data),
                                    )
                                ) {
                                    setEditAdmin({
                                        edit: true,
                                        data: data,
                                        isChanged: false,
                                        editId: admin._id,
                                    });
                                } else {
                                    setEditAdmin({
                                        edit: true,
                                        data: data,
                                        isChanged: true,
                                        editId: admin._id,
                                    });
                                }
                            } else {
                                setAddAdmin({
                                    add: true,
                                    data: data,
                                });
                            }
                        }}>
                        {({
                            isValid,
                            errors,
                            touched,
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    name='username'
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                    margin='dense'
                                    id='username'
                                    label={'Імя користувача'}
                                    type='text'
                                    fullWidth
                                    error={touched.username && Boolean(errors.username)}
                                />
                                <TextField
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                    margin='dense'
                                    id='email'
                                    label={'Пошта'}
                                    type='text'
                                    fullWidth
                                    error={touched.email && Boolean(errors.email)}
                                />
                                <TextField
                                    fullWidth
                                    margin='dense'
                                    type='password'
                                    label={'Введіть пароль'}
                                    name='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    helperText={touched.password ? errors.password : ''}
                                    error={touched.password && Boolean(errors.password)}
                                />
                                <TextField
                                    fullWidth
                                    margin='dense'
                                    type='password'
                                    label={'Підтвердіть пароль'}
                                    name='confirmPassword'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    helperText={
                                        touched.confirmPassword ? errors.confirmPassword : ''
                                    }
                                    error={
                                        touched.confirmPassword && Boolean(errors.confirmPassword)
                                    }
                                />

                                <div style={{ margin: '1rem', textAlign: 'center' }}>
                                    <Button onClick={handleClose} color='primary'>
                                        {'Відмінити'}
                                    </Button>
                                    <Button disabled={!isValid} type='submit' color='primary'>
                                        {admin ? 'Оновити' : 'Добавити'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminAddDialog;
