import { Container } from '@material-ui/core';
import React from 'react';
import LeftSideBar from '../components/LeftSideBar';
import Navbar from '../components/Navbar';
import Content from '../components/ToursContent';
import AboutUs from './AboutUs';
import Footer from './Footer';


const MainPage = () => {
    return (
        <div className='main-pagetwo'>
            <Navbar />
            <div className='main-page' style={{
                display: 'block',
                textAlign: 'center',
                color: 'white',
                paddingBottom: '50px'
            }}>
                <h1>ТУРЫ И ПОХОДЫ ПО КЫРГЫЗСТАНУ <br />Путешествовать легко и просто</h1>
            </div>
            <Container>
                <div className="main-content">
                    <LeftSideBar />
                    <Content />
                </div>
                <AboutUs />
            </Container>
        </div>
    );
};

export default MainPage;