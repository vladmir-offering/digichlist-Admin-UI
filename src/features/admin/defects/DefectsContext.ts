import React from 'react';
import { Defect } from './DefectsModels';

type DefectStatus = 'open' | 'fixing' | 'solved' | string;

interface IDeleted {
    status: boolean;
    id: string;
}
interface IUpdated {
    status: boolean;
    data: any;
}
interface IStatus {
    status: boolean;
    body: any;
    value: DefectStatus;
}

interface IDefectsContext {
    setDeleted: React.Dispatch<React.SetStateAction<IDeleted>>;
    setUpdated: React.Dispatch<React.SetStateAction<IUpdated>>;
}

const DefectsContext = React.createContext<IDefectsContext>({} as IDefectsContext);

export default DefectsContext;
