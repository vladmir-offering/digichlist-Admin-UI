import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

import styles from './DeleteDialog.module.css';

function InfoDialog({ open, setOpen, setDeleted, id, title }): JSX.Element {
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
                <DialogTitle className={styles.entityTitle}>Видалити {title}?</DialogTitle>
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
