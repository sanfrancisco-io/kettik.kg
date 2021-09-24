import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
    const handleChange = (e) => {
        let newInputs = {
            ...checkPeople,
            [e.target.name]: e.target.value
        }
        seChecktPeople(newInputs)
    }
    const buyTours = () => {
        localStorage.removeItem('cart')
    }
    const handleClick = (e) => {
        e.preventDefault()
        if (
            !checkPeople.name.trim() ||
            !checkPeople.mail.trim() ||
            !checkPeople.phone.trim()
        ) {
            alert("Заполните все поля")
            return
        }
        buyTours()
        window.open('/paymentform')
    }

    let cart = JSON.parse(localStorage.getItem('cart'))
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
                    <TextField value={checkPeople.name} onChange={handleChange} name='name' type='text' id="standard-basic" label="Имя заказчика" />
                    <TextField value={checkPeople.mail} onChange={handleChange} name='mail' type='mail' id="standard-basic" label="Почту заказчика" />
                    <TextField value={checkPeople.phone} onChange={handleChange} name='phone' type='tel' id="standard-basic" label="Введите телефон заказчика" />
                    <Button
                        style={{ marginTop: '20px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >Купить</Button>
                </form>
            </div>
        </>
    );
};

export default OrderForm;