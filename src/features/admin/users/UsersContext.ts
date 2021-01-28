import React from 'react';
import { User } from './models/UsersModels';

type DefectStatus = 'open' | 'fixing' | 'solved' | string;

interface IDeleted {
    status: boolean;
    id: string;
}
interface IUpdated {
    status: boolean;
    data: any;
}

interface IUsersContext {
    setDeleted: React.Dispatch<React.SetStateAction<IDeleted>>;
    setUpdated: React.Dispatch<React.SetStateAction<IUpdated>>;
}

const UsersTable = React.createContext<IUsersContext>({} as IUsersContext);

export default UsersTable;
