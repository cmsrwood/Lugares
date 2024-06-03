import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2'
import {BACKEND_URL,FRONTEND_URL} from '../config.js'


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
    <div className='container text-center '>
      <h1 >Lugares</h1>
      <Link to='/add'><button className='btn btn-success'><i className='bi'></i>Añadir nuevo lugar</button></Link>
      <div className="row row-cols-1 row-cols-md-4 g-4">
          {Lugares.map(lugar => (
            <div class="card col mb-3" key={lugar.id} >
              <div class="card-body">
                <h5 class="card-title">{lugar.nombre}</h5>
                <p class="card-text">{lugar.desc}</p>
                <span>
                  <NumericFormat value={lugar.link}displayType={'text'}thousandSeparator=',' prefix={'COP '}/>
                </span>
                <div className="row">
                  <Link className='btn btn-warning col' to={`/update/${lugar.id}`}>Update</Link>
                  <Link className='btn btn-danger col' onClick={()=>handleDelete(lugar.id)}>Delete</Link>
                </div>
              </div>
              </div>
          ))}
      </div>
    </div>
  )
}
