import React, {useState, useEffect} from 'react' /* componente para crear jutnas */
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const endpoint = 'http://localhost:8000/api/junta' /* utilizamos la api */

const CreateJunta = () => {

    /* implementamos las variables que utilizaremos, estas son las mismas que tenemos en el modelo del proyecto de laravel */
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [start_time, setStart_time] = useState('')
    const [end_time, setEnd_time] = useState('')
    const [date, setDate] = useState('')
    const navigate = useNavigate()

    const store = async (e) => { // funcion store para crear una nueva junta
        e.preventDefault()
        await axios.post(endpoint, {name: name, room: room, date: date, start_time: start_time, end_time: end_time});
        navigate('/');
        /* utilizando axios.post, el endpoint y le mandamos las variables que el usuario deberá llenar en pantalla */
    }
    
    var btn_guardar_junta = document.getElementById('btn_guardar_junta') /* obtenemos este elemento, que es el boton
    para guardar la sala tipo submit */
    let Salas =["Sala 1"] /* arreglo para las salas en la etiqueta select del formulario */

    function ValidaFecha(){ /* este es el algoritmo para validar la fecha que ingresa el usuario */
        var fech = new Date()
        var dia_actual = fech.getDate().toString() /* necesitamos el día actual para compararlo con el día que selecciona el usuario */
        var mes_actual = (fech.getMonth() + 1).toString() /* asi como el mes*/
        var anio_actual = fech.getFullYear() /* y el año */
        if(dia_actual.length <=1 ){ // condicional para obtener en el formato correcto el dia, 01 02 03 etc...
            dia_actual = "0" + dia_actual
        }
        if(mes_actual.length <= 1){ // condicional para obtener en el formato correcto el mes, 01 02 03 etc...
            mes_actual = "0" + mes_actual
        } 
        let fecha_hoy = anio_actual + "-" + mes_actual + "-" + dia_actual /* let fecha_hoy para obtener en formato correcto la fecha actual */
        console.log(`Fecha de hoy: ${fecha_hoy}`) /* observamos por consola el resultado obtenido de la fecha de hoy */

        var fecha_usuario = document.getElementById('fecha_usuario').value
        /* obtenemos el valor del elemento tipo date que el usuario manipula en pantalla}*/
        console.log(`Fecha usuario: ${fecha_usuario}`)
        /* imprimimos en la consola la fecha que selecciona el usuario */

        if (fecha_usuario > fecha_hoy){ // condicional cuando la fecha del usuario es mayor
            console.log("la fecha del usuario es mayor")
            btn_guardar_junta.disabled = false; /* habilitamos el boton de guardar */
        }else if(fecha_usuario == fecha_hoy){   /* condicional cuando las fechas son iguales */
            console.log("las fechas son iguales")
            btn_guardar_junta.disabled = false;     /* habilitamos el boton de guardar */
        }else if(fecha_usuario < fecha_hoy){ /* condicional cuando la feccha del usuario es invalida o es menor a la fecha de hoy */
            console.log("Alerta: la fecha del usuario es anterior a el día de hoy")
            swal({  /* justo en este caso mandamos una alerta con los siguientes parametros */
                title: "Fecha invalida",
                text: "La fecha que seleccionaste es anterior a el día de hoy, prueba con otra fecha",
                icon: "error",
                button: "Aceptar"
            })
            btn_guardar_junta.disabled = true; /* también en este momento pasamos el estado del boton de habilitado a deshabilitadop
            esto para que el usuario no pueda guardar un dato que es invalido, con esto logramos la validación de la fecha */
        }
    }
    function ValidaDuracion(){ /* funcion para validar la duracion de la junta */
        var start_time = document.getElementById('start_time').value    
        /* obtenemos el valor del input para la hora de inicio que ingresa el usuario */
        var end_time = document.getElementById('end_time').value
        /* obtenemos el valor del input para la hora de terminación que ingresa el usuario */
        console.log(start_time)
        console.log(end_time)
        /* imprimimos en consola los resultados inicuiales que nos arrojan las variables */
        
        start_time = parseFloat(start_time)
        end_time = parseFloat(end_time)
        /* utilizamos parseFloat para obtener la hora en valores enteros */
        console.log(start_time)
        console.log(end_time)
        /* vemos en consola el valor de las variables para comparar el valor anterior */
        var minutos_start_time = start_time * 60
        var minutos_end_time = end_time * 60
        /*  declaramos estas variables donde almacenaremos el valor de las variables anteriores, pero convertido en minutos */
        console.log("La hora de inicio en minutos es -" + minutos_start_time + "- minutos")
        console.log("La hora de finalización en minutos es -" + minutos_end_time + "- minutos")
        /* visualizamos los valores en la consola para poder compararlos y visualizarlos en minutos también */
        var duracion_junta = minutos_end_time - minutos_start_time
        console.log("La duración de la junta es de: " + duracion_junta + " minutos")
        /* declaramos una variable para calcular la duracion de la junta, esto restando el valor de la 
        hora de finalizacion menos (-) el valor de la hora de inicio en minutos los 2, posteriormente imprimimos en consola
        el valor de la duracion de la junta para llevar a cabo la validación */

        if(duracion_junta > 120){ /* implementamos este if, doonde decimos que si la duracion de la junta es mayor a 120
        minutos, le mandaremos un alerta al usuario con los siguientes parametros */
            console.log("Error: las salas no se pueden reservar por más de 2 horas")
            swal({
                title: "Horario Invalido",
                text: "Error: las salas no se pueden reservar por más de 2 horas, prueba con otro horario",
                icon: "error",
                button: "Aceptar"
            })
            btn_guardar_junta.disabled = true; /* posteriormente bloqueamos el boton para que el usuario no pueda reservar una sala por más de 2 horas */
        } else if (start_time > end_time){ /* adicionalmente tambien se implementa este if para que el usuario no pueda ingresar una hora 
        de finalizacion menor a la hora de inicio */
            console.log("Error: la hora de inicio no puede ser mayor a la hora de terminación")
            btn_guardar_junta.disabled = true; /* si esto ocurre también bloqueamos el botón */
        } else if (start_time == end_time){
            console.log("Error: La hora de inicio y terminación no pueden ser iguales")
            btn_guardar_junta.disabled = true; /* también bloqueamos el botón en caso de que las 2 horas sean iguales, las juntas no pueden tener una duración
            de 0 minutos */
        } else if (start_time < end_time){ /* finalmente si las horas son correctas y la duración no exceed de 120 minutos, habilitamos el botón */
            btn_guardar_junta.disabled = false;
        }
    }
    
    
  return (
    <div>
        <h3>Crear Nueva Junta</h3>
        <form 
        style={{backgroundColor: '#393d51', 
        borderStyle: 'groove', 
        borderWidth: '5px', 
        borderColor: '#c59b21', 
        width:'400px',  
        margin: '0px auto',
        marginBottom: '70px' }}
        /* estilos para que destaque el formulario y se distinga */
        onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label' >Nombre</label>
                <input /* input para ingresaer el nombre */
                    style={{width: 300}}
                    value={name}
                    onChange={ (e)=> setName(e.target.value)}
                    type='text'
                    className='form-control'
                    placeholder='Ingresa el nombre de la junta...'
                />

            </div>
            <div className='mb-3'>
                <label className='form-label' >Seleccionar Sala</label>
                <select /* etiqueta tipo select para seleccionar la junta */
                    className='form-select'
                    style={{width: 150}}
                    value={room}
                    onChange={(e)=>setRoom(e.target.value)} >
                    <option ></option>
                    <option > {Salas[0]} </option>
                </select>
            </div>
            <div className='mb-3'>
                <label className='form-label' >Fecha</label>
                <input /* input tipo date para ingresar la fecha */
                    id='fecha_usuario'
                    style={{width: 150}}
                    value={date}
                    onChange={ (e)=> setDate(e.target.value)}
                    onChangeCapture={ValidaFecha} /* en su propiedad onChangeCapture le mandamos la funcion ValidaFecha 
                    para que la función trabaje correctamente y se realize la validación con éxtio */
                    type='date'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label' >Hora de inicio</label>
                <input /* input tipo time para ingresar la hora de inicio */
                    id='start_time'
                    value={start_time}
                    onChange={ (e)=> setStart_time(e.target.value)}
                    type='time'
                    className='form-control'
                    style={{width: 150}}
                    onChangeCapture={ValidaDuracion} /* en su propiedad onChangeCapture le mandamos la funcion de validar duracion
                    para que la validacion funcione correctamente mientras se utiliza este control */
                />
            </div>
            <div className='mb-3'>
                <label className='form-label' >Hora de terminación</label>
                <input  /* input tipo time para ingresar la hora de finalizacion */
                    id='end_time'
                    value={end_time}
                    onChange={ (e)=> setEnd_time(e.target.value)}
                    type='time'
                    className='form-control'
                    style={{width: 150}}
                    onChangeCapture={ValidaDuracion}/* en su propiedad onChangeCapture le mandamos la funcion de validar duracion
                    para que la validacion funcione correctamente mientras se utiliza este control */
                />
            </div>
            <button id='btn_guardar_junta' type='submit' className='btn btn-primary'>Guardar</button>
            {/* boton s}tipo submit para hacer el guardado de datos, necesitamos ponerle el id */}
            <a className='btn btn-secondary' href='/' >Regresar</a>
            {/* boton para regresar a la página inicial */}
        </form>
    </div>
  )
}

export default CreateJunta