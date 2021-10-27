import React from 'react';
import AddTours from '../components/AddTours';
import OutToursTable from '../components/OutToursTabel';

const AdminPage = () => {
    return (
        <div className='admin-page'>
            <AddTours />
            {/* <OutToursTable /> */}
        </div>
    );
};

export default AdminPage;