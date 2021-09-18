import { Button, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { adminContext } from '../contexts/AdminContext';

const EditTours = () => {
    const { getToursToEdit, saveEditedTour, toursToEdit } = useContext(adminContext)
    const [editTours, setEditTours] = useState(toursToEdit)
    const { id } = useParams()

    useEffect(() => {
        setEditTours(toursToEdit)
    }, [toursToEdit])

    useEffect(() => {
        getToursToEdit(id)
    }, [])

    const history = useHistory()

    const handleInputs = (e) => {
        let obj = {
            ...editTours,
            [e.target.name]: e.target.value
        }
        setEditTours(obj)
    }


    return (
        <div>
            {
                editTours ?
                    (
                        <div className="add_inputs">
                            <form>
                                <TextField
                                    value={editTours.title}
                                    id="standard-basic"
                                    label="Название пылесоса"
                                    onChange={handleInputs}
                                    name='title'
                                />
                                <TextField
                                    value={editTours.description}
                                    id="standard-basic"
                                    label="Описание пылесоса"
                                    onChange={handleInputs}
                                    name='description'
                                />
                                <TextField
                                    value={editTours.price}
                                    type='number'
                                    id="standard-basic"
                                    label="Цена пылесоса"
                                    onChange={handleInputs}
                                    name='price'
                                />
                                <TextField type="date"
                                    value={editTours.year}
                                    id="standard-basic"
                                    label="Дата выпуска пылесоса"
                                    name="year"
                                    onChange={handleInputs} />
                                <TextField
                                    value={editTours.color}
                                    id="standard-basic"
                                    label="Цвет пылесоса"
                                    onChange={handleInputs}
                                    name='color'
                                />
                                <TextField
                                    value={editTours.photo}
                                    id="standard-basic"
                                    label="фото пылесоса"
                                    onChange={handleInputs}
                                    name='photo'
                                />
                                <TextField
                                    value={editTours.weight}
                                    type='number'
                                    id="standard-basic"
                                    label="Вес пылесоса"
                                    onChange={handleInputs}
                                    name='weight'
                                />
                                <TextField
                                    value={editTours.brand}
                                    id="standard-basic"
                                    label="Бренд пылесоса"
                                    onChange={handleInputs}
                                    name='brand'
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (!editTours.title.trim()
                                            || !editTours.description.trim()
                                            || !editTours.price.trim()
                                            || !editTours.color.trim()
                                            || !editTours.photo.trim()
                                            || !editTours.brand.trim()
                                            || !editTours.weight.trim()
                                            || !editTours.year.trim()) {
                                            alert('Заполните все поля!')
                                            return
                                        }
                                        saveEditedTour(editTours)
                                        history.push('/admin')
                                    }}
                                >
                                    Редактировать
                                </Button>
                            </form>
                        </div>
                    ) :
                    (
                        <h2>Loading</h2>
                    )
            }
        </div>
    );
};

export default EditTours;
