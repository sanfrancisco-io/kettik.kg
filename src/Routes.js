import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminContextProvider from './contexts/AdminContext';
import ClientContextProvider from './contexts/ClientContext';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import FavoriteTours from './pages/FavoriteTours';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import OrderForm from './components/OrderForm';
import PaymentForm from './components/PaymentForm';

const Routes = () => {
    return (
        <ClientContextProvider>
            <AdminContextProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={MainPage} />
                        <Route exact path='/admin' component={AdminPage} />
                        <Route exact path='/sign-in' component={SignInPage} />
                        <Route exact path='/sign-up' component={SignUpPage} />
                        <Route exact path="/edit/pizza/:id" component={EditPage} />
                        <Route exact path="/cart" component={CartPage} />
                        <Route exact path="/favorite" component={FavoriteTours} />
                        <Route exact path="/orderform" component={OrderForm} />
                        <Route exact path="/paymentform" component={PaymentForm} />
                    </Switch>
                </BrowserRouter>
            </AdminContextProvider>
        </ClientContextProvider>

    );
};

export default Routes;