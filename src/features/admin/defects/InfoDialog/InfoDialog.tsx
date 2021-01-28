import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Divider,
} from '@material-ui/core';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import styles from './InfoDialog.module.css';

const useStyles = makeStyles({
    Card: {
        maxWidth: 345,
    },
    DialogContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ContentPhoto: {
        maxWidth: '100%',
    },
    Divider: {
        margin: '0.5rem 0',
    },
});

function InfoDialog({ open, setOpen, defect }): JSX.Element {
    const classes = useStyles();

    const closeModal = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Dialog open={open} onClose={closeModal} aria-labelledby='simple-dialog-title'>
                <Card className={classes.Card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.ContentPhoto}
                            component='img'
                            height='200'
                            image={
                                defect.attachment !== ''
                                    ? defect.attachment
                                    : 'https://makitweb.com/demo/broken_image/images/noimage.png'
                            }
                            title='Фото дефекту'
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='h2'>
                                Місце: {defect.room}
                            </Typography>
                            <Divider className={classes.Divider} />
                            <Typography variant='body1' color='textSecondary' component='p'>
                                Проблема: {defect.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={closeModal} variant='contained' color='primary'>
                            Закрити
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}

export default InfoDialog;
