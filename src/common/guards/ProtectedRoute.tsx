import React from 'react';
import { Redirect, Route } from '../../../node_modules/react-router-dom';
const ProtectedRoute = ({ component: Component, path, authInfo, setAuthInfo }) => {
    return (
        <Route
            render={(props) => {
                if (authInfo) {
                    return <Component setAuthInfo={setAuthInfo} path={path} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
export default ProtectedRoute;
