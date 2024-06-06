import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import {BACKEND_URL} from '../config.js'


export default function Lugares() {

  const navigate = useNavigate()

  const [Lugares,setLugares] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try{
        const res= await axios.get(`${BACKEND_URL}/lugares`)
        setLugares(res.data)
      }catch(err){
        
      }
    }
    fetchAllBooks()
  }, [])

  const handleDelete = async (id) => {
    try{
      await axios.delete(`${BACKEND_URL}/lugares/${id}`)
      Swal.fire({
        title: "Eliminado!",
        text: "El lugar ha sido eliminado",
        icon: "success"
      }).then (()=> navigate(0))
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='container text-center p-5'>
      <h1 className='mb-5'>Lugares</h1>
      <Link to='/add'><button className='btn btn-outline-success'><i className='bi'></i>Añadir nuevo lugar</button></Link>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-5">
          {Lugares.map(lugar => (
            
              <div class="card" key={lugar.id}>
                <div class="card-header">
                  {lugar.nombre}
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <p>{lugar.desc}</p>  
                    <Link target='_blank' to ={`https://www.google.com/maps/search/${lugar.nombre}/@4.6514554,-74.2000918,11.25z?entry=ttu`}><button className='btn btn-outline-primary'>Ir</button></Link>
                  </li>
                  <li class="list-group-item">
                    <Link className='btn btn-outline-warning me-3' to={`/update/${lugar.id}`}><i className="bi bi-pencil-square"></i></Link>
                    <Link className='btn btn-outline-danger' onClick={()=>handleDelete(lugar.id)}><i className='bi bi-trash'></i> </Link>
                  </li>
                </ul>
              </div>
                  
          ))}
      </div>
      
    </div>
  )
}
