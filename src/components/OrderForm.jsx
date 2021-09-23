import React, { useContext, useEffect } from 'react';
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
    stylesForm: {
        width: '100%',
        margin: '0 auto',
        paddingLeft: '150px',
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
        margin: '0 auto'
    }
}));

const OrderForm = () => {
    const buyTours = () => {
        localStorage.removeItem('cart')
    }
    const classes = useStyles();
    let cart = JSON.parse(localStorage.getItem('cart'))
    return (
        <>
            {
                cart ? (
                    <div className={classes.mainContentStyles}>
                        <TableContainer component={Paper} >
                            <Table className={classes.table} aria-label="caption table">
                                <caption className={classes.totalPriceStyles}>Итоговая сумма : {cart.totalPrice}
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
                                                <TableCell align="left">{row.tour.price}</TableCell>
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
                    <TextField id="standard-basic" label="Имя заказчика" />
                    <TextField id="standard-basic" label="Почту заказчика" />
                    <TextField id="standard-basic" label="Введите телефон заказчика" />
                    <Link to='/'>
                        <Button onClick={buyTours} style={{ marginTop: '20px' }} variant="contained" color="primary">Купить</Button>
                    </Link>
                </form>
            </div>
        </>
    );
};

export default OrderForm;