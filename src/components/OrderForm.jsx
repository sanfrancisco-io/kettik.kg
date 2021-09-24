import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { adminContext } from '../contexts/AdminContext'
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { clientContext } from '../contexts/ClientContext';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    table: {
        minWidth: 650,
        marginTop: '20px'
    },
    totalPriceStyles: {
        color: "black !important",
        fontWeight: "bold !important",
        fontSize: "16px !important"
    },
    displayStyles: {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        bottom: '20px'

    },
    mainContentStyles: {
        width: '50%',
    }
}));

const OrderForm = () => {
    const classes = useStyles();
    const [checkPeople, seChecktPeople] = useState({
        name: '',
        mail: '',
        phone: ''
    })
    function handleInputs(e) {
        let newPeoples = {
            ...checkPeople,
            [e.target.name]: e.target.value
        }
        seChecktPeople(newPeoples)
    }
    let cart = JSON.parse(localStorage.getItem('cart'))
    const buyTours = () => {
        localStorage.removeItem('cart')
    }
    return (
        <>
            {
                cart ? (
                    <div className={classes.mainContentStyles}>
                        <TableContainer component={Paper} >
                            <Table className={classes.table} aria-label="caption table">
                                <caption className={classes.totalPriceStyles}>Итоговая сумма : {cart.totalPrice} Сом
                                </caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Название тура</TableCell>
                                        <TableCell align="left">Цена тура</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart.tours.map((row) => (
                                            <TableRow key={row.tour.id}>
                                                <TableCell align="left">{row.tour.title}</TableCell>
                                                <TableCell align="left">{row.tour.price} Сом</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <h2>Loading</h2>
                )
            }
            <div className={classes.stylesForm}>
                <form className={classes.root}>
                    <TextField value={checkPeople.name} onChange={handleInputs} name='name' type='text' id="standard-basic" label="Имя заказчика" />
                    <TextField value={checkPeople.mail} onChange={handleInputs} name='mail' type='mail' id="standard-basic" label="Почту заказчика" />
                    <TextField value={checkPeople.phone} onChange={handleInputs} name='phone' type='tel' id="standard-basic" label="Введите телефон заказчика" />
                    {
                        checkPeople.name.trim() || checkPeople.mail.trim() ? (
                            <Link to='/paymentform'>
                                <Button style={{ marginTop: '20px' }} variant="contained" color="primary" onClick={(e) => {
                                    buyTours()
                                }}
                                > Купить</Button>
                            </Link>) : (null)
                    }
                </form>
            </div>
        </>
    );
};

export default OrderForm;