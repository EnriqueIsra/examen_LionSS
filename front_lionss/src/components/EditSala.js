import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/sala/'

const EditSala = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            name: name,
            description: description
        })
        navigate('/')
    }

    useEffect(() => {
        const getSalaById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setName(response.data.name)
            setDescription(response.data.description)
        }
        getSalaById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h3>Editar sala</h3>
            <form
            style={{backgroundColor: '#393d51', borderStyle: 'groove', borderWidth: '5px', borderColor: '#c59b21', width:'400px',  margin: '0px auto'}}
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