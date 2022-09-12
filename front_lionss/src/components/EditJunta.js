import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert'

const endpoint = 'http://localhost:8000/api/junta/'

const EditJunta = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [start_time, setStart_time] = useState('')
    const [end_time, setEnd_time] = useState('')
    const [date, setDate] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`, {
            name: name,
            room: room,
            start_time: start_time,
            end_time: end_time,
            date: date
        })
        navigate('/')
    }

    useEffect(() => {
        const getJuntaById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setName(response.data.name)
            setRoom(response.data.room)
            setDate(response.data.date)
            setStart_time(response.data.start_time)
            setEnd_time(response.data.end_time)
        }
        getJuntaById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    var btn_guardar_junta = document.getElementById('btn_guardar_junta')
    let Salas =["Sala 1"]

    function ValidaFecha(){
        var fech = new Date()
        var dia_actual = fech.getDate().toString()
        var mes_actual = (fech.getMonth() + 1).toString()
        var anio_actual = fech.getFullYear()
        if(dia_actual.length <=1 ){
            dia_actual = "0" + dia_actual
        }
        if(mes_actual.length <= 1){
            mes_actual = "0" + mes_actual
        } 
        let fecha_hoy = anio_actual + "-" + mes_actual + "-" + dia_actual
        console.log(`Fecha de hoy: ${fecha_hoy}`)

        var fecha_usuario = document.getElementById('fecha_usuario').value
        console.log(`Fecha usuario: ${fecha_usuario}`)

        if (fecha_usuario > fecha_hoy){
            console.log("la fecha del usuario es mayor")
            btn_guardar_junta.disabled = false;
        }else if(fecha_usuario == fecha_hoy){
            console.log("las fechas son iguales")
            btn_guardar_junta.disabled = false;
        }else if(fecha_usuario < fecha_hoy){
            console.log("Alerta: la fecha del usuario es anterior a el día de hoy")
            swal({
                title: "Fecha invalida",
                text: "La fecha que seleccionaste es anterior a el día de hoy, prueba con otra fecha",
                icon: "error",
                button: "Aceptar"
            })
            btn_guardar_junta.disabled = true;
        }
    }
    function ValidaDuracion(){
        var start_time = document.getElementById('start_time').value
        var end_time = document.getElementById('end_time').value
        console.log(start_time)
        console.log(end_time)
        
        start_time = parseFloat(start_time)
        end_time = parseFloat(end_time)
        console.log(start_time)
        console.log(end_time)
        var minutos_start_time = start_time * 60
        var minutos_end_time = end_time * 60
        console.log("La hora de inicio en minutos es -" + minutos_start_time + "- minutos")
        console.log("La hora de finalización en minutos es -" + minutos_end_time + "- minutos")
        var duracion_junta = minutos_end_time - minutos_start_time
        console.log("La duración de la junta es de: " + duracion_junta + " minutos")

        if(duracion_junta > 120){
            console.log("Error: las salas no se pueden reservar por más de 120 minutos")
            swal({
                title: "Horario Invalido",
                text: "Error: las salas no se pueden reservar por más de 120 minutos, prueba con otro horario",
                icon: "error",
                button: "Aceptar"
            })
            btn_guardar_junta.disabled = true;
        } else if (start_time > end_time){
            console.log("Error: la hora de inicio no puede ser mayor a la hora de terminación")
            btn_guardar_junta.disabled = true;
        } else if (start_time == end_time){
            console.log("Error: La hora de inicio y terminación no pueden ser iguales")
            btn_guardar_junta.disabled = true;
        } else if (start_time < end_time){
            btn_guardar_junta.disabled = false;
        }
    }

    return (
        <div>
            <h3>Editar Junta</h3>
            <form
            style={{backgroundColor: '#393d51', borderStyle: 'groove', borderWidth: '5px', borderColor: '#c59b21', width:'400px',  margin: '0px auto'}}
            onSubmit={update}>
                <div className='mb-3'>
                <label className='form-label' >Nombre</label>
                <input 
                    style={{width: 300}}
                    value={name}
                    onChange={ (e)=> setName(e.target.value)}
                    type='text'
                    className='form-control'
                    placeholder='Ingresa el nombre de la junta...'
                />

            </div>
            <div className='mb-3'>
                <label className='form-label' >Sala</label>
                <select 
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
                <input 
                     id='fecha_usuario'
                    style={{width: 150}}
                    value={date}
                    onChange={ (e)=> setDate(e.target.value)}
                    type='date'
                    className='form-control'
                    onChangeCapture={ValidaFecha}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label' >Hora de inicio</label>
                <input 
                    id='start_time'
                    value={start_time}
                    onChange={ (e)=> setStart_time(e.target.value)}
                    type='time'
                    className='form-control'
                    style={{width: 150}}
                    onChangeCapture={ValidaDuracion}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label' >Hora de terminación</label>
                <input 
                    id='end_time'
                    value={end_time}
                    onChange={ (e)=> setEnd_time(e.target.value)}
                    type='time'
                    className='form-control'
                    style={{width: 150}}
                    onChangeCapture={ValidaDuracion}
                />
            </div>
            <button id='btn_guardar_junta' type='submit'  className='btn btn-primary' border-color='white'>Guardar</button>
            <a className='btn btn-secondary' href='/' >Regresar</a>
            </form>
        </div>
    )
}

export default EditJunta


