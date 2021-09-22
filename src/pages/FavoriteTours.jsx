import React from 'react';
import { Container } from 'react-bootstrap';
import FavoriteTable from '../components/FavoriteTable';
import Navbar from '../components/Navbar';

const FavoriteTours = () => {
    return (
        <>
            <Navbar />
            <Container>
                <div className="cart">
                    <h3 className="cart-title">Избранные</h3>
                    <FavoriteTable />
                </div>
            </Container>
        </>
    );
};

export default FavoriteTours;