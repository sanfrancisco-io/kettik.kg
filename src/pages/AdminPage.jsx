import React from 'react';
import AddTours from '../components/AddTours';
import OutToursTable from '../components/OutToursTabel';
import { Button } from '@material-ui/core';

const AdminPage = () => {
    return (
        <div className='admin-page'>
            <AddTours />
            <OutToursTable />
        </div>
    );
};

export default AdminPage;