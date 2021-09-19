import { Button, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { adminContext } from '../contexts/AdminContext';

const EditTours = () => {
    const { getToursToEdit, saveEditedTour, toursToEdit } = useContext(adminContext)
    const [editTours, setEditTours] = useState(toursToEdit)
    const { id } = useParams()
    console.log("id", id);

    useEffect(() => {
        setEditTours(toursToEdit)
    }, [toursToEdit])

    useEffect(() => {
        getToursToEdit(id)
    }, [])
    console.log('EditTours toursToEdit', toursToEdit)
    console.log('EditTours editTours', editTours)

    const history = useHistory()

    const handleInputs = (e) => {
        let obj = {
            ...editTours,
            [e.target.name]: e.target.value

        }
        console.log("e", e);
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
                                    value={editTours.Accessibility}
                                    id="standard-basic"
                                    label="Название пылесоса"
                                    onChange={handleInputs}
                                    name='Accessibility'
                                />
                                <TextField
                                    value={editTours.complexity}
                                    id="standard-basic"
                                    label="Описание пылесоса"
                                    onChange={handleInputs}
                                    name='complexity'
                                />
                                <TextField
                                    value={editTours.description}

                                    id="standard-basic"
                                    label="Цена пылесоса"
                                    onChange={handleInputs}
                                    name='description'
                                />
                                <TextField
                                    value={editTours.photo}
                                    id="standard-basic"
                                    label="Дата выпуска пылесоса"
                                    name="photo"
                                    onChange={handleInputs} />
                                <TextField
                                    value={editTours.price}
                                    id="standard-basic"
                                    label="Цвет пылесоса"
                                    // type="number"
                                    onChange={handleInputs}
                                    name='price'
                                />
                                <TextField
                                    value={editTours.route}
                                    id="standard-basic"
                                    label="фото пылесоса"
                                    onChange={handleInputs}
                                    name='route'
                                />
                                <TextField
                                    value={editTours.title}

                                    id="standard-basic"
                                    label="Вес пылесоса"
                                    onChange={handleInputs}
                                    name='title'
                                />

                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (!editTours.Accessibility.trim()
                                            || !editTours.complexity.trim()
                                            || !editTours.description.trim()
                                            || !editTours.photo.trim()
                                            || !editTours.price.trim()
                                            || !editTours.route.trim()
                                            || !editTours.title.trim()) {
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
