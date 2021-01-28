import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

import styles from './DeleteDialog.module.css';
import DefectsContext from '../UsersContext';

function InfoDialog({ open, setOpen, id }): JSX.Element {
    const { setDeleted } = React.useContext(DefectsContext);

    const closeModal = () => {
        setOpen(false);
    };
    function deleteHandler() {
        setDeleted(() => {
            return {
                status: true,
                id: id,
            };
        });
    }
    return (
        <React.Fragment>
            <Dialog open={open} onClose={closeModal} aria-labelledby='simple-dialog-title'>
                <DialogTitle className={styles.entityTitle}>Видалити дефект?</DialogTitle>
                <DialogActions className={styles.deleteModal}>
                    <Button onClick={closeModal} color='primary'>
                        Скасувати
                    </Button>
                    <Button
                        onClick={deleteHandler}
                        type='submit'
                        disableElevation
                        variant='contained'
                        color='primary'>
                        Підтвердити
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default InfoDialog;
