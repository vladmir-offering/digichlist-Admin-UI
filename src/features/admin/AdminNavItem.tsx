import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    itemText: {
        fontSize: '1rem',
    },
    active: {
        color: 'white',
        fontWeight: 500,
        backgroundColor: theme.palette.primary.main,
        '& svg': {
            color: 'white',
        },
    },
}));

export const MainListItems = ({ path, icon, title }) => {
    const classes = useStyles();
    return (
        <ListItem component={NavLink} to={path} exact activeClassName={classes.active}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
                disableTypography
                className={classes.itemText}
                color='primary'
                primary={title}
            />
        </ListItem>
    );
};
