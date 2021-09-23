import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Truncate from 'react-truncate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
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

export default function FavoiteTable({ item }) {
    const classes = useStyles();
    const { favorites, getFavorites, addAndDeleteToursInFavorite, checkTourInFavorite, checkTourInCart, addAndDeleteToursInCart } = useContext(clientContext)

    useEffect(() => {
        getFavorites()
    }, [])
    console.log(favorites);

    return (
        <>
            {favorites ? (
                <Card className={classes.root}>
                    {favorites.tours.map((row, index) => (
                        <><CardActionArea>
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
                                <Typography style={{ fontWeight: 'bold' }} className={classes.priceContent}>
                                    <h3>Цена :{row.tour.price}</h3>
                                </Typography>
                            </CardContent>
                        </CardActionArea><CardActions className={classes.cardDisplay}>
                                <Button
                                    onClick={() => addAndDeleteToursInCart(item)}
                                    size="small"
                                    color="primary">
                                    <ShoppingCartIcon color={checkTourInCart(row.tour.id) ? 'secondary' : 'primary'} />
                                </Button>
                                <Button
                                    onClick={() => addAndDeleteToursInFavorite(item)}
                                    size="small"
                                    color="gray">
                                    <FavoriteIcon color={checkTourInFavorite(row.tour.id) ? 'secondary' : 'primary'} />
                                </Button>
                                <Button
                                    onClick={() => addAndDeleteToursInFavorite(item)}
                                    size="small"
                                    color="gray">
                                    <ChatIcon color={checkTourInFavorite(row.tour.id) ? 'secondary' : 'primary'} />
                                </Button>
                            </CardActions></>
                    ))}
                </Card>


            ) : (
                <h2>Loading</h2>
            )
            }
        </>
    );
}
