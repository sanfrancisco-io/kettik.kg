import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";


const Chat = () => {
    return (
        <>
            <Navbar />
            <Container>
                <div className="chat">
                    <h3 className="chat-title">Это чат</h3>
                </div>
            </Container>
        </>
    );
};

export default Chat;