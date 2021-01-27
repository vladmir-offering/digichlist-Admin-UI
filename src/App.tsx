import React, { useState, useEffect } from 'react';
import Login from './features/login';
import AdminPanel from './features/admin/AdminPanel';
import LoginRoute from './common/guards/LoginRoute';
import { isLogged } from './common/utils/api';

import ProtectedRoute from './common/guards/ProtectedRoute';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

function App(): JSX.Element {
    const [authInfo, setAuthInfo] = useState(false);
    useEffect(() => {
        async function isAuth() {
            const res = await isLogged();
            setAuthInfo(res);
        }
        isAuth();
    }, []);
    return (
        <Switch>
            <Redirect path='/' to='/login' component={Login} exact />
            <Redirect path='/admin' exact to='/admin/dashboard' />
            <ProtectedRoute
                authInfo={authInfo}
                setAuthInfo={setAuthInfo}
                path='/admin'
                component={AdminPanel}
            />
            <LoginRoute
                setAuthInfo={setAuthInfo}
                authInfo={authInfo}
                path='/login'
                component={Login}
            />
            <Route path='*' component={() => <h1>404</h1>} />
        </Switch>
    );
}

export default App;
