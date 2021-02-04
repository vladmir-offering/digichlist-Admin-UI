import React from 'react';
import {
    Dialog,
    List,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Divider,
    ListItemText,
    ListItem,
    ListItemAvatar,
    Collapse,
    Button,
    ListItemIcon,
} from '@material-ui/core';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Chat, ExpandLess, ExpandMore } from '@material-ui/icons';
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
    commetariesTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    listItem: {
        color: '#8c8c8c',
    },
    listIcon: {
        minWidth: '2rem',
    },
    subTitle: {
        color: '#212121',
    },
});

function InfoDialog({ open, setOpen, defect }): JSX.Element {
    const [openList, setOpenList] = React.useState(true);
    const classes = useStyles();

    const handleClickList = () => {
        setOpenList(!openList);
    };
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
                                Кімната: {defect.room}
                            </Typography>
                            <Divider className={classes.Divider} />
                            <Typography variant='body1' color='textSecondary' component='p'>
                                <span className={classes.subTitle}>Проблема:</span> {defect.title}
                            </Typography>
                            <Divider className={classes.Divider} />
                            <List dense={true} component='div' disablePadding>
                                <Typography
                                    className={classes.commetariesTitle}
                                    onClick={handleClickList}
                                    variant='body1'
                                    component='h4'>
                                    <span>Коментарі</span>
                                    {openList ? <ExpandLess /> : <ExpandMore />}
                                </Typography>
                                <Collapse in={openList} timeout='auto' unmountOnExit>
                                    {defect.comments.map((comment, index) => {
                                        return (
                                            <ListItem
                                                divider={true}
                                                dense={true}
                                                disableGutters={true}
                                                key={index}
                                                className={classes.listItem}>
                                                <ListItemIcon
                                                    className={clsx(
                                                        classes.listItem,
                                                        classes.listIcon,
                                                    )}>
                                                    <Chat />
                                                </ListItemIcon>
                                                <ListItemText
                                                    className={classes.listItem}
                                                    primary={comment.message}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </Collapse>
                            </List>
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
