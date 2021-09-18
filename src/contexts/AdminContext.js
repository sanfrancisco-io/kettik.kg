import axios from 'axios';
import React, { useReducer } from 'react';
import { API } from '../helpers/constapi';


export const adminContext = React.createContext()

const INIT_STATE = {
    tours: null,
    toursToEdit: null
}
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_TOURS':
            return { ...state, tours: action.payload }
        case 'GET_TOUR_TO_EDIT':
            return { ...state, toursToEdit: action.payload }
        default:
            return { ...state }
    }
}
const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const createTours = async (newItem) => {
        await axios.post(API, { ...newItem, price: +newItem.price })
        getTours()
    }

    const getTours = async () => {
        const { data } = await axios(API)
        dispatch({
            type: 'GET_TOURS',
            payload: data
        })
    }

    const deleteTour = async (id) => {
        await axios.delete(`${API}/${id}`)
        getTours()
    }

    const getToursToEdit = async (id) => {
        const { data } = await axios(`${API}/${id}`)
        dispatch({
            type: 'GET_TOUR_TO_EDIT',
            payload: data
        })
    }

    const saveEditedTour = async (editedTour) => {
        await axios.patch(`${API}/${editedTour.id}`, { ...editedTour, price: +editedTour.price })
        getTours()
    }
    return (
        <adminContext.Provider value={{
            createTours,
            getTours,
            deleteTour,
            getToursToEdit,
            saveEditedTour,

            toursToEdit: state.toursToEdit,
            tours: state.tours
        }}>
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;