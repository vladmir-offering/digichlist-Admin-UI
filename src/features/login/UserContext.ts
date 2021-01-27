import React from 'react';

interface IUserContext {
    admin_username: string;
}

const UserContext = React.createContext<IUserContext>({} as IUserContext);

export default UserContext;
