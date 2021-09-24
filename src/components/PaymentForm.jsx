import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default class PaymentForm extends React.Component {


    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    render() {
        return (
            <div className='paymentCardForm' id="PaymentForm">
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <form>
                    <TextField
                        id="standard-basic"
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <TextField
                        id="standard-basic"
                        type="tel"
                        name="expire"
                        placeholder="MM/YY"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <TextField
                        id="standard-basic"
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <Link to='/'>
                        <Button style={{ marginTop: '20px' }} variant="contained" color="primary">Купить</Button>
                    </Link>
                </form>
            </div>
        );
    }
}