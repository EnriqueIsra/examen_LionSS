import React, {useState, useEffect} from 'react' // componente para crear una sala
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/sala' // const endpoint para hacer referencia a la api

const CreateSala = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const store = async (e) => { // método para crear una nueva sala
        e.preventDefault()
        await axios.post(endpoint, {name: name, description: description}) // utilizamos axios.post para crear una nueva sala
        // utilizmos el endpoint e indicamos las variables que vamos a utilizar
        navigate('/')

    }
  return (
    <div>
        <h3>Crear Nueva Sala</h3>
        <form 
        style={{backgroundColor: '#393d51', borderStyle: 'groove', borderWidth: '5px', borderColor: '#c59b21', width:'400px',  margin: '0px auto'}}
        /* Le damos un poco de estilos al formulario */
        onSubmit={store}> {/* en su propiedad onSubmit le mantamos el metodo store para crear un nuevo registro mediante post con axios */}
            <div className='mb-3'>
                <label className='form-label' >Nombre</label>
                <input /* input para ingresar el nombre */
                    style={{width: '250px'}}
                    value={name}
                    onChange={ (e)=> setName(e.target.value)}
                    type='text'
                    className='form-control'
                    placeholder='Ingresa el nombre de la sala...'
                />

            </div>
            <div className='mb-3'>
                <label className='form-label' >Descripción</label>
                <input /* input para ingresar la descripción de la sala */
                    style={{width: 300, height: 80}}
                    value={description}
                    onChange={ (e)=> setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                    placeholder='Ingresa una descripción de la sala..'
                />
            </div>
            <button type='submit'  className='btn btn-primary' border-color='white'>Guardar</button>
            {/* boton tu}ipo submit para guardar los datos ingresados */}
            <a className='btn btn-secondary' href='/' >Regresar</a>
        </form>
    </div>
  )
}

export default CreateSala