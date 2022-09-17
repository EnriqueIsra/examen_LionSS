import React, {useEffect, useState} from 'react' // componente show salas, muestra la tabla de salas
import axios from 'axios' // importamos axios
import {Link} from 'react-router-dom' // importamos Link de router-dom
import '../App.css';  // importamos los estilos
import swal from 'sweetalert' // importamos sweetaler para mandar alertas bonitas

 
const endpoint = 'http://localhost:8000/api' // variable endpint que nos hace referencia a la dirección de la api
const ShowSalas = () => { // ShowSalas el nombre del componente y función principal

    const [busqueda, setBusqueda] = useState ([]) // esto para manejar el filtrafdo de datos
    const [tablaSalas, setTablaSalas] = useState ( [] ) // esto para manejar el filtrafdo de datos
    const [salas, setSalas] = useState( [] )
        useEffect( () =>{
            getAllSalas()
        },[])

    const getAllSalas = async () =>{//para mostrar todos los datos
        const response = await axios.get(`${endpoint}/salas`) // usamos método get con axios, le mandamos el endpiont y el prefijo salas, para traer toda la tabla
        setSalas(response.data) // .data para que se recoja los datos
        setTablaSalas(response.data)//para mostrar todos los datos filtrados
    }

    const deleteSala =  (id) =>{// método para el borrado de datos
        swal({
            title: "Eliminar sala", //Titulo de la alerta 
            text: "¿Estas seguro de eliminar la seleccionada?", //texto
            icon: "warning", // icono de cuidado
            buttons: ["Cancelar","Aceptar"] // botones para cancelar o aceptar en la alerta
        }).then(respuesta =>{
            if (respuesta){ // implementamos un if por si la respuesta es aceptar
                axios.delete(`${endpoint}/sala/${id}`) // usamos axios.delete, a través del endpiont y el id del registro para hacer un borrado de la fila seleccionada
                swal({
                    text:"La sala se ah eliminado exitosamente", // alerta para confirmar el borrado
                    icon: "success", // icono de éxito
                    timer: "4000" // tiempo de duracion de esta alerta de segundos 
                })
                getAllSalas()
            }
            else{ // implementamos un else para cuando la respuesta es cancelar
                swal({
                    text:"No se eliminó ninguna sala", // no hacemos nada, solo otra alerta donde se avisa que no se hizo ningun borrado
                    icon: "error", // icono de error
                    timer: "4000" // tiempo de segundos 
                })
            }
        })
        
    }
    const handleChange=e=>{ //para el filtrado y búsqueda de datos
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }
    const filtrar=(terminoBusqueda)=>{ // funcion para la busqueda de datos en la tabla
        var resultadosBusqueda = tablaSalas.filter((elemento)=>{ 
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) // aquí indicamos que el filtrado será a través del nombre de la sala
            ||elemento.description.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) // aqui el filtrado también se hace por la descripción de la sala
            
            {
                return elemento; // retornamos el elemento que coincide con la busqueda
            }
        });
        setSalas(resultadosBusqueda);
    }

    useEffect(()=>{
        getAllSalas();
    },[])
  return (
    <div 
    style={{borderStyle: 'groove', borderColor: '#c59b21', borderRadius: '15px', width: '1300px', margin: '0px auto'}}> {/* le damos un poco de estilos al div, para que se distinga y resalte */}
        <div className='d-grid gap-2'>
            <div>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white' >Crear Nueva sala</Link> 
            {/* ponemos un Link tipo boton para que nos dirija al componente para crear una nueva sala */}
            </div>
            <input /* input tipo texto que sirve para la búsqueda de datos */
            style={{width: 400}} /* un poco de estilo personalizado a este input */
            className='form-control inputBuscar' 
            value={busqueda} 
            type="text" 
            placeholder="Buscar sala..."
            onChange={handleChange} > {/* indicamos en onChange la funcion de filtrado habdleChange */}
            </input> 
            <br></br>
            
        </div>
        <table 
        style={{borderStyle: 'groove', width: '1200px', margin: '0px auto', marginBottom: '30px', marginTop: '15px'}} /* implementamos un poco de estilos a la tabla de salas */
        className='table table-striped'>
            <thead className='text-black'>
                <tr key={salas.name} >
                    <th>ID</th> {/* indicamos con th las columnas de la tabla de salas */}
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {salas.map((sala)=>( /* Hacemos el mapeo con salas.map para listar cada una de las filas */
                    <tr key={sala.id}>
                        <td> {sala.id} </td> {/* queremos traer el id de la sala */}
                        <td> {sala.name} </td> {/* el nombre */}
                        <td> {sala.description} </td> {/* y la descripción */}
                        <td>
                            <Link to={`/edit/${sala.id}`} className='btn btn-warning text-white' >Editar</Link> 
                            {/* implementamos un botón Link hacia el componente para editar sala usando el ID */}
                            <button onClick={ ()=>deleteSala(sala.id) } className='btn btn-danger' >Borrar</button>
                            {/* implementamos un boton para borrar la sala, en su propiedad onClick le mandamos el método para 
                            borrar la sala a través del ID seleccionado */}
                        </td>


                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowSalas /* export default ShowSalas */