import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { clientContext } from '../contexts/ClientContext';

const useStyles = makeStyles({
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

    }
});


export default function CartTable() {
    const classes = useStyles();
    const { getCart, cart, getTours, changeCountTours } = useContext(clientContext)
    console.log(cart);
    useEffect(() => {
        getCart()
    }, [])

    function handleChange(id, count) {
        if (count < 1) {
            return
        }
        changeCountTours(count, id)
    }

    console.log(cart);
    return (
        <>
            {
                cart ? (
                    <TableContainer component={Paper} >
                        <Table className={classes.table} aria-label="caption table">
                            <caption className={classes.totalPriceStyles}>Итоговая сумма : {cart.totalPrice}
                                <div className={classes.displayStyles}>
                                    <Link to='/orderform'>
                                        <Button variant="contained" color="primary">Оформить заказ</Button>
                                    </Link>
                                </div>
                            </caption>

                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="left">Название тура</TableCell>
                                    <TableCell align="left">Цена тура</TableCell>
                                    <TableCell align="left">Маршрут тура</TableCell>
                                    <TableCell align="left">Доступность тура по временам года</TableCell>
                                    <TableCell align="left">Тип тура</TableCell>
                                    <TableCell align="left">Сложность тура</TableCell>
                                    <TableCell align="left">Количество</TableCell>
                                    <TableCell align="left">Общая сумма</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.tours.map((row, index) => (
                                    <TableRow key={row.tour.id}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">{row.tour.title}</TableCell>
                                        <TableCell align="left">{row.tour.price}</TableCell>
                                        <TableCell align="left">{row.tour.route}
                                        </TableCell>
                                        <TableCell align="left">{row.tour.accessibility}</TableCell>
                                        <TableCell align="left">{row.tour.type}</TableCell>
                                        <TableCell align="left">{row.tour.complexity}</TableCell>
                                        <input type="number"
                                            value={row.count}
                                            onChange={(e) => handleChange(row.tour.id, e.target.value)} />
                                        <TableCell align="left">{row.subPrice}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <h2>Loading...</h2>
                )
            }
        </>
    );
}
