import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert';

export const messages = [];

// interface Snackbar {
//     snack: {
//         open: boolean;
//         message: string;
//         type: Color;
//     };
//     setSnack(snack);
// }

export default function SnackbarHandler({ snack, setSnack }): JSX.Element {
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
                severity={snack.type}>
                {snack.message}
            </Alert>
        </Snackbar>
    );
}
