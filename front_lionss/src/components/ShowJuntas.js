import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../App.css';
import swal from 'sweetalert'

 
const endpoint = 'http://localhost:8000/api'
const ShowJuntas = () => {

    const [busqueda, setBusqueda] = useState ([])
    const [tablaJuntas, setTablaJuntas] = useState ( [] )
    const [juntas, setJuntas] = useState( [] )
        useEffect( () =>{
            getAllJuntas()
        },[])

    const getAllJuntas = async () =>{//para mostrar todos los datos
        const response = await axios.get(`${endpoint}/juntas`)
        setJuntas(response.data)
        setTablaJuntas(response.data)//para mostrar todos los datos filtrados
    }

    const deleteJunta =  (id) =>{//para el borrado de datos
        swal({
            title: "Eliminar Reunion",
            text: "¿Estas seguro de eliminar esta reunion?",
            icon: "warning",
            buttons: ["Cancelar","Aceptar"]
        }).then(respuesta =>{
            if (respuesta){
                axios.delete(`${endpoint}/junta/${id}`)
                swal({
                    text:"La reunion se ah eliminado exitosamente",
                    icon: "success",
                    timer: "4000"
                })
                getAllJuntas()
            }
            else{
                swal({
                    text:"No se eliminó ninguna reunion",
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
        var resultadosBusqueda = tablaJuntas.filter((elemento)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ||elemento.room.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ||elemento.date.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) )
            
            {
                return elemento;
            }
        });
        setJuntas(resultadosBusqueda);
    }

    useEffect(()=>{
        getAllJuntas();
    },[])
  return (
    <div
    style={{borderStyle: 'groove', borderColor: '#c59b21', borderRadius: '15px', width: '1300px', margin: '0px auto'}}>
        <div className='d-grid gap-2'>
            <div>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white' >Crear Nueva Junta</Link>
            </div>
            <div>
            <input
            style={{width: 400, }}
            className='form-control inputBuscar' 
            value={busqueda} 
            type="text" 
            placeholder="Buscar junta..."
            onChange={handleChange} >
            </input> 
            </div>
            <br></br>
        </div>
        <table 
        style={{borderStyle: 'groove', width: '1200px', margin: '0px auto', marginBottom: '30px', marginTop: '15px'}} 
        className='table table-striped'>
            <thead className='text-black'>
                <tr key={juntas.id} >
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Sala</th>
                    <th>Hora de inicio</th>
                    <th>Hora de terminación</th>
                    <th>Fecha</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {juntas.map((junta)=>(
                    <tr key={junta.id}>
                        <td> {junta.id} </td>
                        <td> {junta.name} </td>
                        <td> {junta.room} </td>
                        <td> {junta.start_time} </td>
                        <td> {junta.end_time} </td>
                        <td> {junta.date} </td>
                        <td>
                            <Link to={`/edit/${junta.id}`} className='btn btn-warning text-white' >Editar</Link>
                            <button onClick={ ()=>deleteJunta(junta.id) } className='btn btn-danger' >Borrar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowJuntas