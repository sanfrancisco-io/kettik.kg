import { TextField, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { adminContext } from '../contexts/AdminContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    colorText: {
        color: 'white'
    }
})
const AddTours = () => {
    const classes = useStyles();
    const [tours, setTours] = useState({
        title: '',
        price: '',
        route: '',
        description: '',
        accessibility: '',
        type: '',
        complexity: '',
        photo: ''
    })

    const { createTours } = useContext(adminContext)

    function handleInputs(e) {
        let newTours = {
            ...tours,
            [e.target.name]: e.target.value
        }
        setTours(newTours)
    }
    return (
        <div>
            <div className="add_inputs">
                <form>
                    <TextField
                        value={tours.title}
                        id="standard-basic"
                        label="Название тура"
                        onChange={handleInputs}
                        name='title'
                    />
                    <TextField
                        value={tours.price}
                        type='number'
                        id="standard-basic"
                        label="цена тура"
                        onChange={handleInputs}
                        name='price'
                    />
                    <TextField
                        value={tours.route}
                        id="standard-basic"
                        label="маршрут тура"
                        onChange={handleInputs}
                        name='route'
                    />
                    <TextField
                        value={tours.description}
                        id="standard-basic"
                        label="Описание тура"
                        name="description"
                        onChange={handleInputs} />
                    <TextField
                        value={tours.accessibility}
                        id="standard-basic"
                        label="Доступность тура по временам года"
                        onChange={handleInputs}
                        name='accessibility'
                    />
                    <TextField
                        value={tours.type}
                        id="standard-basic"
                        label="Тип тура"
                        onChange={handleInputs}
                        name='type'
                    />
                    <TextField
                        value={tours.complexity}
                        id="standard-basic"
                        label="сложность тура"
                        onChange={handleInputs}
                        name='complexity'
                    />
                    <TextField
                        value={tours.photo}
                        id="standard-basic"
                        label="фото"
                        onChange={handleInputs}
                        name='photo'
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={(e) => {
                            e.preventDefault()
                            if (!tours.title.trim()
                                || !tours.price.trim()
                                || !tours.route.trim()
                                || !tours.description.trim()
                                || !tours.accessibility.trim()
                                || !tours.type.trim()
                                || !tours.complexity.trim()
                                || !tours.photo.trim()) {
                                alert('Заполните все поля!')
                                return
                            }
                            createTours({
                                title: tours.title.trim(),
                                price: tours.price.trim(),
                                route: tours.route.trim(),
                                description: tours.description.trim(),
                                accessibility: tours.accessibility.trim(),
                                type: tours.type.trim(),
                                complexity: tours.complexity.trim(),
                                photo: tours.photo.trim(),
                            })
                        }}
                    >
                        Создать
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddTours;