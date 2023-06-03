import { useState, useEffect } from "react"
import { consultarAgenda } from "../services/servicio"
import Swal from 'sweetalert2'

export function Formulario() {

    const[inputNombre,setInputNombre]=useState(null)
    const[inputCorreo,setInputCorreo]=useState(null)
    const[inputHora,setInputHora]=useState(null)
    const[errores,setErrores]=useState({})

    const[envioFormulario,setEnvioFormulario]=useState(false)
    const[reservas,setReservas]=useState(null)
    const[carga,setCarga]=useState(true)

    useEffect(function(){
        consultarAgenda()
        .then(function(respuesta){
            setReservas(respuesta.reservas)
            setCarga(false)
        })
    },[])

    //activamos un primer useEffect()
    useEffect(function(){
        if(Object.keys(errores).length==0 && envioFormulario){
            Swal.fire(
            'Hemos rentado la pelicula!',
            'You clicked the button!',
            'success'
            )

        }else if(envioFormulario){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'la fallamos como el DIM'+errores.nombre+"-"+errores.correo,
              })

        }
    },[errores,envioFormulario])

    function validarFormulario(evento){
        evento.preventDefault()
        let listaErrores={}
        if(!inputNombre){
            listaErrores.nombre="El nombre es obligatorio"
        }
        if(!inputCorreo){
            listaErrores.correo="El correo es obligatorio"

        }
        if(!inputHora){
            listaErrores.hora="Debe seleccionar una hora"
        }
        setErrores(listaErrores)
        setEnvioFormulario(true)
        
        
    }


    if(carga){

        return(
            <h1>Estoy cargando...</h1>
        )

    }else{
        return (
            <>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <form onSubmit={validarFormulario}>
    
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bi bi-person-circle"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        onChange={function(evento){setInputNombre(evento.target.value)}}
                                        placeholder="nombres" />
                                </div>
    
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope-paper-heart-fill"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="correo"
                                        onChange={function(evento){setInputCorreo(evento.target.value)}}
                                        placeholder="correo" />
                                </div>
    
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="bi bi-clock-fill"></i>
                                    </span>
                                    <select
                                        defaultValue={"DEFAULT"} 
                                        id="hora"
                                        onChange={function(evento){setInputHora(evento.target.value)}}
                                        className="form-select">
    
                                        <option value="DEFAULT">Selecciona una hora: </option>
                                        <option value="1">8:00 am</option>
                                        <option value="2">9:00 am</option>
                                        <option value="3">10:00 am</option>
                                    </select>
                                </div>
    
                                <button type="submit" className="btn btn-primary w-100">AGENDAR</button>
    
                            </form>
                        </div>
                    </div>
                </div>
                <section className="container">
                    <div className="row row-cols-1 row-cols-md-5 g-3">
                        {
                            reservas.map(function(reserva){
                                return(
                                    <div className="col">
                                        <div className="card h-100 shadow">
                                            <h5>{reserva.nombre}</h5>
                                            <p>{reserva.dia}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </>
        )
    }

}