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
                                    value={editTours.accessibility}
                                    id="standard-basic"
                                    label="Доступность тура"
                                    onChange={handleInputs}
                                    name='accessibility'
                                />
                                <TextField
                                    value={editTours.complexity}
                                    id="standard-basic"
                                    label="Сложность тура"
                                    onChange={handleInputs}
                                    name='complexity'
                                />
                                <TextField
                                    value={editTours.description}

                                    id="standard-basic"
                                    label="Описание тура"
                                    onChange={handleInputs}
                                    name='description'
                                />
                                <TextField
                                    value={editTours.photo}
                                    id="standard-basic"
                                    label="Фото тура"
                                    name="photo"
                                    onChange={handleInputs} />
                                <TextField
                                    value={editTours.price}
                                    id="standard-basic"
                                    label="Цена тура"
                                    type="number"
                                    onChange={handleInputs}
                                    name='price'
                                />
                                <TextField
                                    value={editTours.type}
                                    id="standard-basic"
                                    label="Тип тура"
                                    onChange={handleInputs}
                                    name='type'
                                />
                                <TextField
                                    value={editTours.route}
                                    id="standard-basic"
                                    label="Маршрут тура"
                                    onChange={handleInputs}
                                    name='route'
                                />
                                <TextField
                                    value={editTours.title}

                                    id="standard-basic"
                                    label="Название"
                                    onChange={handleInputs}
                                    name='title'
                                />

                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (!editTours.accessibility.trim()
                                            || !editTours.type.trim()
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
