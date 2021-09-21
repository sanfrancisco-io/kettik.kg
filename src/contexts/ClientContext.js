import axios from 'axios';
import React, { useReducer } from 'react';
import { calcSubPrice, calcTotalPrice } from '../helpers/calc';
import { TOURS_API } from '../helpers/constapi';

export const clientContext = React.createContext()

const INIT_STATE = {
    tours: null,
    toursCountInCart: JSON.parse(localStorage.getItem('cart'))
        ?
        JSON.parse(localStorage.getItem('cart')).tours.length
        : 0,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_TOURS':
            return { ...state, tours: action.payload }
        case 'ADD_AND_DELETE_TOUR_CART':
            return { ...state, toursCountInCart: action.payload }
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

    const checkTourInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            return false
        }
        let newCart = cart.tours.filter(item => item.tour.id === id)
        return newCart.length ? true : false
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



    return (
        <clientContext.Provider value={{
            getTours,
            addAndDeleteToursInCart,
            checkTourInCart,
            getCart,
            changeCountTours,

            tours: state.tours,
            toursCountInCart: state.toursCountInCart,

        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;