import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import Truncate from 'react-truncate';
import { clientContext } from '../contexts/ClientContext';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '0 10px 10px 10px',
        width: 280,
        minWidth: 240,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media: {
        height: 180,
        backgroundColor: 'rgb(197,199,214)'
    },
    display: {
        display: 'flex',
        paddingTop: '40px'
    },
    textContent: {
        textAlign: 'center'
    },
    priceContent: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    },
    cardDisplay: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

export default function FavoiteTable() {
    const classes = useStyles();
    const { favorites, getFavorites, addAndDeleteToursInFavorite, checkTourInFavorite, checkTourInCart, addAndDeleteToursInCart } = useContext(clientContext)
    useEffect(() => {
        getFavorites()
    }, [])




    return (
        <div className={classes.display}>
            {favorites ? (

                favorites.tours.map(row => (

                    <Card key={row.tour.id} className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={row.tour.photo}
                                title="Contemplative Reptile" />
                            <CardContent>
                                <Typography className={classes.textContent} gutterBottom variant="h6" component="h2">
                                    <Truncate lines={2} ellipsis={<span>... <a href='/link/to/article'>далее</a></span>}>
                                        {row.tour.title}
                                    </Truncate>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Truncate lines={3} ellipsis={<span>... <a href='/link/to/article'>далее</a></span>}>
                                        {row.tour.description}
                                    </Truncate>
                                </Typography>
                                <Typography variant='h6' style={{ fontWeight: 'bold' }} className={classes.priceContent}>
                                    Цена :{row.tour.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea><CardActions className={classes.cardDisplay}>
                            <Button
                                // onClick={() => deleteTours(row.tour.id)}
                                size="small"
                                color="primary">
                                <ShoppingCartIcon color={checkTourInCart(row.tour.id) ? 'secondary' : 'primary'} />
                            </Button>
                            <Button
                                // onClick={() => deleteTours(row.tour.id)}
                                size="small"
                                color="primary">
                                <CloseIcon color={checkTourInFavorite(row.tour.id) ? 'secondary' : 'primary'} />
                            </Button>
                        </CardActions>
                    </Card>
                ))



            ) : (
                <h2>Loading</h2>
            )
            }
        </div>
    );
}