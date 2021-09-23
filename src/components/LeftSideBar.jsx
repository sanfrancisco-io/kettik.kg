import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router';
import { clientContext } from '../contexts/ClientContext';
import { Button } from '@material-ui/core';

const LeftSideBar = () => {

    const { getTours } = React.useContext(clientContext)
    const [price, setPraice] = React.useState('');
    const [typeTours, setTypeTours] = useState('')
    const history = useHistory()
    const filterProducts = (key, value) => {
        let search = new URLSearchParams(history.location.search)
        search.set(key, value)
        let url = `${history.location.pathname}?${search.toString()}`
        history.push(url)
        setPraice(search.get('price_lte'))
        setTypeTours(search.get('type'))
        getTours()
    }
    let search = new URLSearchParams(history.location.search)
    useEffect(() => {
        setPraice(search.get('price_lte'))
        setTypeTours(search.get('type'))
    }, [])
    const resetFilter = () => {
        setPraice('')
        setTypeTours('')
        history.push('/')
        getTours()
    }
    return (
        <div className='left-sidebar'>
            <FormControl component="fieldset">
                <FormLabel component="legend">Цена</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={price} onChange={(e) => filterProducts('price_lte', e.target.value)}>
                    <FormControlLabel value="5000" control={<Radio />} label="5000" />
                    <FormControlLabel value="10000" control={<Radio />} label="10000" />
                    <FormControlLabel value="15000" control={<Radio />} label="15000" />
                    <FormControlLabel value="20000" control={<Radio />} label="20000" />
                    <FormControlLabel value="25000" control={<Radio />} label="25000" />
                </RadioGroup>
            </FormControl>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Виды туров</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={typeTours} onChange={(e) => filterProducts('type', e.target.value)}>
                        <FormControlLabel value="экскурсионный" control={<Radio />} label="Экскурсионные туры" />
                        <FormControlLabel value="спортивный" control={<Radio />} label="Спортивные туры" />
                        <FormControlLabel value="горный" control={<Radio />} label="Горные туры" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={resetFilter}>Reset</Button>
            </div>
        </div >
    );
};

export default LeftSideBar;