import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {BACKEND_URL} from '../config.js'

export default function Add() {


const navigate = useNavigate()


const handleClick = async (e) => {
  try {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    await axios.post(`${BACKEND_URL}/lugares`, formData);
    navigate('/')
    Swal.fire({
      title: "Lugar añadido!",
      text: "El lugar ha sido añadido",
      icon: "success"
    })
  }catch (err) {
    console.log(err);
  }
}


  return (
    <div className='form text-center container p-5'>
      <h1 className='text-center'>Añade un nuevo lugar</h1>
      <form id='form' className='form-group p-5' encType='multipart/form-data' onSubmit={handleClick} >
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Nombre' name='nombre' required/>
      </div>
      <div class="mb-3">
        <input className='form-control' type="text" autoComplete='off' placeholder='Descripcion'  name='desc' required/>
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