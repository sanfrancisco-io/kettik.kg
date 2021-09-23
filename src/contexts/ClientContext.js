import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { calcSubPrice, calcTotalPrice } from '../helpers/calc';
import { TOURS_API } from '../helpers/constapi';

export const clientContext = React.createContext()

const INIT_STATE = {
    tours: null,
    toursCountInCart: JSON.parse(localStorage.getItem('cart'))
        ?
        JSON.parse(localStorage.getItem('cart')).tours.length
        : 0,
    toursCountInFavorite: JSON.parse(localStorage.getItem('favorite'))
        ?
        JSON.parse(localStorage.getItem('favorite')).tours.length
        : 0,
    cart: null,
    favorite: null,

}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_TOURS':
            return { ...state, tours: action.payload }
        case 'ADD_AND_DELETE_TOUR_CART':
            return { ...state, toursCountInCart: action.payload }
        case 'ADD_AND_DELETE_TOUR_FAVORITE':
            return { ...state, toursCountInFavorite: action.payload }
        case "GET_CART":
            return { ...state, cart: action.payload }
        case "GET_FAVORITES":
            return { ...state, favorites: action.payload }
        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getTours = async () => {
        const { data } = await axios(`${TOURS_API}${window.location.search}`)
        dispatch({
            type: 'GET_TOURS',
            payload: data
        })
        console.log(window.location.search);
    }

    const addAndDeleteToursInCart = (tour) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                tours: [],
                totalPrice: 0
            }
        }
        let newTour = {
            tour: tour,
            count: 1,
            subPrice: 0
        }
        newTour.subPrice = calcSubPrice(newTour)
        let newCart = cart.tours.filter(item => item.tour.id === tour.id)
        if (newCart.length) {
            cart.tours = cart.tours.filter(item => item.tour.id !== tour.id)
        } else {
            cart.tours.push(newTour)
        }
        cart.totalPrice = calcTotalPrice(cart.tours)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: 'ADD_AND_DELETE_TOUR_CART',
            payload: cart.tours.length
        })
        console.log(cart);
    }

    const addAndDeleteToursInFavorite = (tour) => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if (!favorite) {
            favorite = {
                tours: [],
            }
        }
        let newTour = {
            tour: tour,
            count: 1
        }
        let newFavorite = favorite.tours.filter(item => item.tour.id === tour.id)
        if (newFavorite.length) {
            favorite.tours = favorite.tours.filter(item => item.tour.id !== tour.id)
        } else {
            favorite.tours.push(newTour)
        }
        localStorage.setItem('favorite', JSON.stringify(favorite))
        dispatch({
            type: 'ADD_AND_DELETE_TOUR_FAVORITE',
            payload: favorite.tours.length
        })
        console.log(favorite);
    }
    const checkTourInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            return false
        }
        let newCart = cart.tours.filter(item => item.tour.id === id)
        return newCart.length ? true : false
    }
    const checkTourInFavorite = (id) => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if (!favorite) {
            return false
        }
        let newFavorite = favorite.tours.filter(item => item.tour.id === id)
        return newFavorite.length ? true : false
    }
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({
            type: 'GET_CART',
            payload: cart
        })
    }
    const getFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorite'))
        dispatch({
            type: 'GET_FAVORITES',
            payload: favorites
        })
    }

    const changeCountTours = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            return
        }
        cart.tours = cart.tours.map(item => {
            if (item.tour.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.tours)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    // pagination start 
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(6)

    useEffect(() => {
        const fetchTours = () => {
            const data = state.tours || []
            setPosts(data)
        }
        fetchTours()
    }, [state.tours])

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirst = indexOfLastPost - postPerPage
    const currentPosts = posts.slice(indexOfFirst, indexOfLastPost)
    const totalPosts = posts.length

    const changePage = (newPage) => {
        setCurrentPage(newPage)
    }
    // pagination end


    // auth and login start
    const createNewUser = async (newUser, history) => {
        try {
            const { data } = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/registration', newUser)
            history.push('/')
            console.log(data)

        }
        catch (e) {
            alert(e.response.data.message)
        }
    }
    const login = async (user, history) => {
        try {
            const { data } = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/login', user)
            history.push("/")
            console.log(data)
            localStorage.setItem('token', JSON.stringify(data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }




    // auth and login end

    return (
        <clientContext.Provider value={{
            getTours,
            addAndDeleteToursInCart,
            checkTourInCart,
            getCart,
            changeCountTours,
            addAndDeleteToursInFavorite,
            checkTourInFavorite,
            changePage,
            getFavorites,
            createNewUser,
            login,


            currentPosts,
            postPerPage,
            totalPosts,
            tours: state.tours,
            toursCountInCart: state.toursCountInCart,
            cart: state.cart,
            favorites: state.favorites,
            toursCountInFavorite: state.toursCountInFavorite

        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;