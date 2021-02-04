import React, { useEffect, useState } from 'react';
import { Chip } from '@material-ui/core';

function Satus({ status }: any): JSX.Element {
    const [statusLabel, setStatusLabel] = useState(<Chip label='Відкритий' color='secondary' />);
    useEffect(() => {
        switch (status.toString()) {
            case 'all':
                setStatusLabel(
                    <Chip label='Всі' style={{ backgroundColor: '#4caf50', color: 'white' }} />,
                );
                break;
            case 'open':
                setStatusLabel(
                    <Chip
                        label='Відкритий'
                        style={{ backgroundColor: '#4caf50', color: 'white' }}
                    />,
                );
                break;
            case 'fixing':
                setStatusLabel(
                    <Chip
                        label='В процесі'
                        style={{ backgroundColor: '#ff9800', color: 'white' }}
                    />,
                );
                break;
            case 'solved':
                setStatusLabel(<Chip label='Закритий' />);
                break;
            case 'true':
                setStatusLabel(
                    <Chip
                        label='Активний'
                        style={{ backgroundColor: '#4caf50', color: 'white' }}
                    />,
                );
                break;
            case 'false':
                setStatusLabel(<Chip label='Неактивний' />);
                break;
        }
    }, []);
    return statusLabel;
}

export default Satus;
