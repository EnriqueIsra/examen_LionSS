import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../App.css';
import swal from 'sweetalert'

 
const endpoint = 'http://localhost:8000/api'
const ShowSalas = () => {

    const [busqueda, setBusqueda] = useState ([])
    const [tablaSalas, setTablaSalas] = useState ( [] )
    const [salas, setSalas] = useState( [] )
        useEffect( () =>{
            getAllSalas()
        },[])

    const getAllSalas = async () =>{//para mostrar todos los datos
        const response = await axios.get(`${endpoint}/salas`)
        setSalas(response.data)
        setTablaSalas(response.data)//para mostrar todos los datos filtrados
    }

    const deleteSala =  (id) =>{//para el borrado de datos
        swal({
            title: "Eliminar sala",
            text: "¿Estas seguro de eliminar la seleccionada?",
            icon: "warning",
            buttons: ["Cancelar","Aceptar"]
        }).then(respuesta =>{
            if (respuesta){
                axios.delete(`${endpoint}/sala/${id}`)
                swal({
                    text:"La sala se ah eliminado exitosamente",
                    icon: "success",
                    timer: "4000"
                })
                getAllSalas()
            }
            else{
                swal({
                    text:"No se eliminó ninguna sala",
                    icon: "error",
                    timer: "4000"
                })
            }
        })
        
    }
    const handleChange=e=>{ //para el filtrado y búsqueda de datos
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda = tablaSalas.filter((elemento)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ||elemento.description.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
            
            {
                return elemento;
            }
        });
        setSalas(resultadosBusqueda);
    }

    useEffect(()=>{
        getAllSalas();
    },[])
  return (
    <div 
    style={{borderStyle: 'groove', borderColor: '#c59b21', borderRadius: '15px', width: '1300px', margin: '0px auto'}}>
        <div className='d-grid gap-2'>
            <div>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white' >Crear Nueva sala</Link>
            </div>
            <input 
            style={{width: 400}}
            className='form-control inputBuscar' 
            value={busqueda} 
            type="text" 
            placeholder="Buscar sala..."
            onChange={handleChange} >
            </input> 
            <br></br>
            
        </div>
        <table 
        style={{borderStyle: 'groove', width: '1200px', margin: '0px auto', marginBottom: '30px', marginTop: '15px'}} 
        className='table table-striped'>
            <thead className='text-black'>
                <tr key={salas.name} >
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {salas.map((sala)=>(
                    <tr key={sala.id}>
                        <td> {sala.id} </td>
                        <td> {sala.name} </td>
                        <td> {sala.description} </td>
                        <td>
                            <Link to={`/edit/${sala.id}`} className='btn btn-warning text-white' >Editar</Link>
                            <button onClick={ ()=>deleteSala(sala.id) } className='btn btn-danger' >Borrar</button>
                        </td>


                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowSalas