import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
    AppBar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    List,
    Box,
    Typography,
    Avatar,
    Divider,
    Toolbar,
    Button,
    Badge,
} from '@material-ui/core';

import { Menu, Close } from '@material-ui/icons';
import { makeStyles, useTheme, withStyles, Theme, createStyles } from '@material-ui/core/styles';

import { MainListItems } from './AdminNavItem';
import Admins from './admins';
import Orders from './orders';
import DefectsTable from './defects/index';
import UsersTable from './users/index';
import Dashboard from './dashboard/index';
import { navList } from './nav';
import { logOut } from '../../common/utils/api';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
    },
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
    avatar: {
        height: '100px',
        width: '100px',
    },
    linkBtn: {
        color: 'white',
        textDecoration: 'none',
    },
}));

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }),
)(Badge);

const AdminPanel = ({ setAuthInfo }): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const [admin_username, setAdminUserName] = useState(localStorage.getItem('admin_username'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }
    const logoutHandler = async () => {
        logOut();
        setAuthInfo(false);
    };
    const drawer = (
        <div>
            <List>
                {navList.map(({ path, icon, title }, index) => (
                    <MainListItems key={index + title} path={path} icon={icon} title={title} />
                ))}
            </List>
        </div>
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='Open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        <Link to='/admin/dashboard' className={classes.linkBtn}>
                            Digichlist
                        </Link>
                    </Typography>
                    <Button color='inherit' onClick={logoutHandler}>
                        Вихід
                    </Button>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                <Hidden smUp implementation='css'>
                    <Drawer
                        variant='temporary'
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}>
                        <IconButton
                            onClick={handleDrawerToggle}
                            className={classes.closeMenuButton}>
                            <Close />
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation='css'>
                    <Drawer
                        className={classes.drawer}
                        variant='permanent'
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        <div className={classes.toolbar} />
                        <Box alignItems='center' display='flex' flexDirection='column' p={2}>
                            <StyledBadge
                                color='secondary'
                                overlap='circle'
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent=''>
                                <Avatar
                                    variant='circular'
                                    component={Link}
                                    to='/admin/admins'
                                    src='/logo.png'
                                    className={classes.avatar}
                                />
                            </StyledBadge>
                            <Typography
                                color='textPrimary'
                                variant='h5'>
                                {admin_username}
                            </Typography>
                            <Typography color='textSecondary' variant='body2'>
                                Адмін
                            </Typography>
                        </Box>
                        <Divider />
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path='/admin/dashboard' component={Dashboard} />
                    <Route path='/admin/admins' component={Admins} />
                    <Route path='/admin/defects' component={DefectsTable} />
                    <Route path='/admin/users' component={UsersTable} />
                    <Route path='/admin/orders' component={Orders} />
                </Switch>
            </div>
        </div>
    );
};

export default AdminPanel;
