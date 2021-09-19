import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminContextProvider from './contexts/AdminContext';
import AdminPage from './pages/AdminPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';

const Routes = () => {
    return (
        <AdminContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/admin' component={AdminPage} />
                    <Route exact path='/sign-in' component={SignInPage} />
                    <Route exact path="/edit/:id" component={EditPage} />
                </Switch>
            </BrowserRouter>
        </AdminContextProvider>
    );
};

export default Routes;