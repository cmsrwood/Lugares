import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {BACKEND_URL} from '../config.js'

export default function Add() {

const [lugar,setLugar] = useState({
  nombre:"",
  desc:"",
  link:"",
  photos:""
})

const navigate = useNavigate()

const handleChange = (e) => {
  setLugar(prev => ({...prev,[e.target.name]: e.target.value}));}

const handleClick = async (e) => {
  e.preventDefault();
  try {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    lugar.photos = (formData.getAll('photos')).map((photo) => photo.name).toString()
    await axios.post(`${BACKEND_URL}/upload`, formData)
    await axios.post(`${BACKEND_URL}/lugares`, lugar).then (()=> 
      Swal.fire("Lugar creado!", "", "success"),
      navigate("/")); 
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className='form text-center container p-5'>
      <h1 className='text-center'>Añade un nuevo lugar</h1>
      <form id='form' className='form-group p-5' encType='multipart/form-data' onSubmit={handleClick} >
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Nombre' onChange={handleChange} name='nombre' required/>
      </div>
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Descripcion' onChange={handleChange} name='desc' required/>
      </div>
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Link' onChange={handleChange} name='link'/>
      </div>
      <div class="mb-3">
        <input className='form-control' type="file" multiple accept='image/*' autoComplete='off' id ='photos' name='photos' required/>
      </div>
        <button className='btn btn-outline-success' type='submit'>Añadir</button>
        <Link to='/' className='btn btn-outline-danger ms-3'>Cancelar</Link>
      </form>
    </div>
  )
}