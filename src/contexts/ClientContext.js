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
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_TOURS':
            return { ...state, tours: action.payload }
        case 'ADD_AND_DELETE_TOUR_CART':
            return { ...state, toursCountInCart: action.payload }
        case 'ADD_AND_DELETE_TOUR_FAVORITE':
            return { ...state, toursCountInFavorite: action.payload }
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

            currentPosts,
            postPerPage,
            totalPosts,
            tours: state.tours,
            toursCountInCart: state.toursCountInCart,
            toursCountInFavorite: state.toursCountInFavorite

        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;