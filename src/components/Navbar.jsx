import React, { useContext, useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { clientContext } from '../contexts/ClientContext';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/Logo.svg';
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    root: {
        backgroundColor: 'rgb(233, 150, 122)'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    navbarTypographyContent: {
        fontSize: '20px',
        marginLeft: '40px',
        cursor: 'pointer',
        "&:hover": {
            borderBottom: '2px solid #CCCCFF'
        }
    },
    logoStyles: {
        height: '50px',
        width: '50px',
    },
    iconColorStyles: {
        color: 'white'
    }
}));

export default function Navbar() {
    const { toursCountInCart, toursCountInFavorite, getTours } = useContext(clientContext)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to='/sign-in'>
                <MenuItem >Войти</MenuItem>
            </Link>
            <Link to='/sign-up'>
                <MenuItem >Регистрация</MenuItem>
            </Link>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={toursCountInCart} color="secondary">
                        <Link to="/cart">
                            <ShoppingCartIcon className={classes.iconColorStyles} />
                        </Link>
                    </Badge>
                </IconButton>
                <p>Корзина</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <Link to="/favorite">
                            <FavoriteIcon className={classes.iconColorStyles} />
                        </Link>

                    </Badge>
                </IconButton>
                <p>Избранное</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Аккаунт</p>
            </MenuItem>
        </Menu>
    );


    // search start

    const history = useHistory('')
    const [searchValue, setSearchValue] = useState('')

    const filterProducts = (key, value) => {
        let search = new URLSearchParams(history.location.search)
        search.set(key, value)
        let url = `${history.location.pathname}?${search.toString()}`
        history.push(url)
        setSearchValue(search.get('q') || '')
        getTours()
    }
    let search = new URLSearchParams(history.location.search)

    useEffect(() => {
        setSearchValue(search.get('q'))
    }, [history.location])

    // search end
    return (
        <div className={classes.grow}>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge color="secondary">
                            <Link to='/'>
                                <Logo viewBox="1 1 80 80" className={classes.logoStyles} />
                            </Link>
                        </Badge>
                    </IconButton>
                    <Typography className={classes.navbarTypographyContent} >
                        О нас
                    </Typography>
                    <Typography className={classes.navbarTypographyContent} >
                        Туры
                    </Typography>
                    <Typography className={classes.navbarTypographyContent} >
                        Контакты
                    </Typography>
                    <Typography className={classes.navbarTypographyContent} >
                        Лайфчат
                    </Typography>
                    <Typography className={classes.navbarTypographyContent} >
                        <Link to="/admin">
                            Админ
                        </Link>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={(e) => { filterProducts('q', e.target.value) }}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={toursCountInCart} color="secondary">
                                <Link to="/cart">
                                    <ShoppingCartIcon className={classes.iconColorStyles} />
                                </Link>
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={toursCountInFavorite} color="secondary">
                                <Link to="/favorite">
                                    <FavoriteIcon className={classes.iconColorStyles} />
                                </Link>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}