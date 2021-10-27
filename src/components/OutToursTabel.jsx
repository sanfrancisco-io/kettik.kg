import React, { useEffect } from 'react';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { adminContext } from '../contexts/AdminContext'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const OutToursTabel = () => {
    const classes = useStyles();
    const { tours, getTours, deleteTour } = useContext(adminContext)
    useEffect(() => {
        getTours()
    }, [])
    return (
        <div>
            {
                tours ? (
                    <TableContainer className='main-table' component={Paper} >
                        <Table className={classes.table} aria-label="caption table">
                            <TableHead>
                                <TableRow className='TableRow'>
                                    <TableCell>№</TableCell>
                                    <TableCell fontWeight="{500}" align="left">Название </TableCell>
                                    <TableCell fontSize={16} align="left">Цена</TableCell>
                                    <TableCell fontWeight={500} align="left">Маршрут</TableCell>
                                    <TableCell align="left">Описание</TableCell>
                                    <TableCell align="left">Фото</TableCell>
                                    <TableCell align="left">Тип</TableCell>
                                    <TableCell align="left">Сложность</TableCell>
                                    <TableCell align="left">Удаление</TableCell>
                                    <TableCell align="left">Редактироание</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tours.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="left">{item.title}</TableCell>
                                            <TableCell align="left">{item.price}</TableCell>
                                            <TableCell align="left">{item.route}</TableCell>
                                            <TableCell align="left">{item.description}</TableCell>
                                            <TableCell align="left">
                                                <img width='100' src={item.photo} alt='toursphoto' />
                                            </TableCell>
                                            <TableCell align="left">{item.type}</TableCell>
                                            <TableCell align="left">{item.complexity}</TableCell>
                                            <TableCell align="left" ><Button align="left" onClick={() => deleteTour(item.id)} variant="contained" color="primary">
                                                Удалить
                                            </Button>
                                            </TableCell>
                                            <TableCell align="left" >
                                                <Link to={`/edit/${item.id}`}>
                                                    <Button align="left" variant="contained" color="primary">
                                                        Редактирование
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
                    :
                    (
                        <h2>Loading...</h2>
                    )
            }
        </div>
    );
};

export default OutToursTabel;
