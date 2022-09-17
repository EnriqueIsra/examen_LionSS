import axios from "axios";      /* componente para editar una sala */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/sala/' /* api con el prefijo sala para hacer la edicion de esta */

const EditSala = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => { /* fi}uncion update para actualizar un registro */
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, { /* utilizamos axios.put para hacer una modificacion a los valores actuales */
            name: name,
            description: description
        })
        navigate('/')
    }

    useEffect(() => {
        const getSalaById = async () => { /* funcion que nos trae los datos actuales de la sala seleccionada */
            const response = await axios.get(`${endpoint}${id}`) /* utilizando axios.get con el endpoint y el id */
            setName(response.data.name)
            setDescription(response.data.description)
        }
        getSalaById()
        
    }, [])

    return (
        <div>
            <h3>Editar sala</h3>
            <form
            style={{backgroundColor: '#393d51', borderStyle: 'groove', borderWidth: '5px', borderColor: '#c59b21', width:'400px',  margin: '0px auto'}}
            /* estilos del formulario,
            esta parte del coomponente es igual al de crear sala */
            onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label' >Nombre</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        className='form-control'
                    />

                </div>
                <div className='mb-3'>
                    <label className='form-label' >Descripción</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary' >Guardar cambios</button>
                <button className='btn btn-secondary' >Regresar</button>
            </form>
        </div>
    )
}

export default EditSala