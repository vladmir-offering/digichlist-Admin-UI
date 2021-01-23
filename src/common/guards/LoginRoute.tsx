import React from 'react';
import { Redirect, Route } from 'react-router-dom';
const LoginRoute = ({ component: Component, path, authInfo, setAuthInfo }) => {
    return (
        <Route
            render={(props) => {
                if (!authInfo) {
                    return <Component setAuthInfo={setAuthInfo} path={path} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/admin/dashboard',
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
export default LoginRoute;
