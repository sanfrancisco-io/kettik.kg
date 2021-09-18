import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminContextProvider from './contexts/AdminContext';
import AdminPage from './pages/AdminPage';
import MainPage from './pages/MainPage';

const Routes = () => {
    return (
        <AdminContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/admin' component={AdminPage} />
                </Switch>
            </BrowserRouter>
        </AdminContextProvider>
    );
};

export default Routes;