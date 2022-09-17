import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../App.css';
import swal from 'sweetalert'

 
const endpoint = 'http://localhost:8000/api'
const ShowJuntas = () => {

    const [busqueda, setBusqueda] = useState ([]) // esto para manejar el filtrafdo de datos
    const [tablaJuntas, setTablaJuntas] = useState ( [] ) // esto para manejar el filtrafdo de datos
    const [juntas, setJuntas] = useState( [] )
        useEffect( () =>{
            getAllJuntas()
        },[])

    const getAllJuntas = async () =>{//para mostrar todos los datos
        const response = await axios.get(`${endpoint}/juntas`) // metodo get con axios, le mandamos el endpoint y el prefijo juntas para traer todas las juntas
        setJuntas(response.data) // setJuntas con .data para traer todos los datos de la tabla
        setTablaJuntas(response.data)//para mostrar todos los datos filtrados
    }

    const deleteJunta =  (id) =>{//método para el borrado de datos
        swal({ //Alerta de advertencia para el borrado de una junta
            title: "Eliminar Reunion", 
            text: "¿Estas seguro de eliminar esta reunion?",
            icon: "warning",
            buttons: ["Cancelar","Aceptar"] //botones para cancelar o aceptar
        }).then(respuesta =>{
            if (respuesta){ // si la respuesta es aceptar, usamos axios.delete le mendamos el endpoint y se hace el borrado a través del id de la junta
                axios.delete(`${endpoint}/junta/${id}`)
                swal({ // alerta de confirmación de borrado
                    text:"La reunion se ah eliminado exitosamente",
                    icon: "success",
                    timer: "4000"
                })
                getAllJuntas()
            }
            else{ // si la respuesta es calncelar no hacemos nada, solo mandamos una alerta para confirmar que no se hizo ninguna aación
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
    const filtrar=(terminoBusqueda)=>{// funcion para filtrar las juntas y hacer las busquedas
        var resultadosBusqueda = tablaJuntas.filter((elemento)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            // aqui filtramos a través del nombre de la junta
            ||elemento.room.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            // aqui filtramos a través de la sala donde se realiza la junta
            ||elemento.date.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) )
            // aqui filtramos las juntas a través de la fecha en la que se reservan
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
        {/* estilos para este div */}
        <div className='d-grid gap-2'>
            <div>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white' >Crear Nueva Junta</Link>
            {/* link que nos redirecciona al componente para crear una junta */}
            </div>
            <div>
            <input /* input para la busqueda de juntas */
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
        /* estilos para la tabla de juntas */ 
        className='table table-striped'>
            <thead className='text-black'>
                <tr key={juntas.id} > {/* key por juntas.id e indicamos las columnas que llevará la tabla de juntas */}
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
                {juntas.map((junta)=>( /* Hacemos el mapeo de datos */
                    <tr key={junta.id}>
                        <td> {junta.id} </td> {/* traemos el id de la junta */}
                        <td> {junta.name} </td> {/* el nomnbre */}
                        <td> {junta.room} </td> {/* la sala */}
                        <td> {junta.start_time} </td> {/* la hora de inicio */}
                        <td> {junta.end_time} </td> {/* lahora de terminación */}
                        <td> {junta.date} </td> {/* y la fecha */}
                        <td>
                            <Link to={`/edit/${junta.id}`} className='btn btn-warning text-white' >Editar</Link>
                            {/* en la ultima columna un link que nos redirecciona al componente de editar juntas a traves del ID */}
                            <button onClick={ ()=>deleteJunta(junta.id) } className='btn btn-danger' >Borrar</button>
                            {/* tambien un boton para borrar, en su propiedad onClick le mandamos el método de borrado a través del ID de la junta seleccionada */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowJuntas