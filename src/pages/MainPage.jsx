import { Container } from '@material-ui/core';
import React from 'react';
import LeftSideBar from '../components/LeftSideBar';
import Navbar from '../components/Navbar';
import Content from '../components/ToursContent';


const MainPage = () => {
    return (
        <div>
            <Navbar />
            <Container>
                <div className="main">
                    <LeftSideBar />
                    <Content />
                </div>
            </Container>
        </div>
    );
};

export default MainPage;