import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import { BACKEND_PORT, DB_HOST, DB_USER, DB_PASS, DB_DATABASE, FRONTEND_URL } from "./config.js"
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

const db = mysql.createConnection({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASS,
    database : DB_DATABASE
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello World from backend") 
})

app.get("/lugares",(req,res)=>{
    db.query("SELECT * FROM lugares",(err,data)=>{
        if(err){
            return res.json(err)
        }else{
            res.send(data)
        }
    })
})

app.post ("/lugares",(req,res)=>{
    const q = "INSERT INTO lugares (`nombre`,`desc`,`link`) VALUES (?)"
    const values = [
        req.body.nombre,
        req.body.desc,
        req.body.link,
    ]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("El lugar se ha creado correctamente")
    })
})

app.delete("/lugares/:id",(req,res)=>{
    const lugarId = req.params.id
    const q = "DELETE FROM lugares WHERE id = ?"

    db.query(q,[lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("El lugar se ha eliminado correctamente")
    })
})

app.get("/lugares/:id",(req,res)=>{
    const lugarId = req.params.id
    const q = "SELECT * FROM lugares WHERE id = ?"

    db.query(q,[lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.send(data[0])
    })
})

app.put("/lugares/:id",(req,res)=>{
    const lugarId = req.params.id
    const q = "UPDATE lugares SET `nombre` = ?, `desc` = ?, `link` = ?  WHERE id = ?"
    const values = [
        req.body.nombre,
        req.body.desc,
        req.body.link,
    ]
    db.query(q,[...values,lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("El lugar se ha actualizado correctamente")
    })
})

app.listen(BACKEND_PORT, ()=>{
    console.log(`Backend server is running on port ${BACKEND_PORT} and frontend on ${FRONTEND_URL}`);
})   