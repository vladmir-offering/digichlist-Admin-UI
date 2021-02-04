import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert';

export interface ISnackbar {
    open: boolean;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
}
export interface SnackbarProperties {
    snack: {
        open: boolean;
        message: string;
        type: 'success' | 'info' | 'warning' | 'error';
    };
    setSnack: any;
}

export default function SnackbarHandler({ snack, setSnack }: SnackbarProperties): JSX.Element {
    const closeSnack = (event, reason?) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack({ open: false });
    };

    return (
        <Snackbar open={snack.open} autoHideDuration={3000} onClose={closeSnack}>
            <Alert
                elevation={4}
                variant='filled'
                onClose={(event) => closeSnack(event)}
                severity={snack.type as Color}>
                {snack.message}
            </Alert>
        </Snackbar>
    );
}
