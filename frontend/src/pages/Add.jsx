import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {BACKEND_URL} from '../config.js'

export default function Add() {

const [lugares,setLugar] = useState({
  nombre:"",
  desc:"",
  link:"",
})

const navigate = useNavigate()

const handleChange = (e) =>{
  setLugar(prev=>({...prev,[e.target.name]:e.target.value}))
}

const handleClick = async (e) =>{
  e.preventDefault()
  try{
    await axios.post(`${BACKEND_URL}/lugares`,lugares)
    navigate("/")
    Swal.fire("Lugar guardado!", "", "success");

  }catch(err){
    console.log(err)
  }
}
  return (
    <div className='form text-center container p-5'>
      <h1>Añade un nuevo lugar</h1>
      <form className='form-group'>
        <input className='form-control' type="text" placeholder='Nombre' onChange={handleChange} name='title'/>
        <input className='form-control' type="text" placeholder='Descripcion' onChange={handleChange} name='desc'/>
        <input className='form-control' type="number" placeholder='Precio' onChange={handleChange} name='price'/>
        <button className='btn btn-success' onClick={handleClick}>Añadir</button>
      </form>
    </div>
  )
}
