import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import multer from 'multer'
import uniquid from 'uniqid'
import { BACKEND_PORT, DB_HOST, DB_USER, DB_PASS, DB_DATABASE, FRONTEND_URL } from "./config.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentModuleDir = path.dirname(currentModulePath);

const pathJSON = path.join(currentModuleDir, './images.json');

const readJSON = () => {
    let template = {
        images:[]
    };
    try {
        const data = fs.readFileSync(pathJSON, 'utf-8')
        if (data.length === 0) {
            return template
        }
        return JSON.parse(data)
    } catch (err) {
        fs.writeFileSync(pathJSON, JSON.stringify(template ,null , 4 ), 'utf-8')
        return template
    }
}

const writeJSON = (data) => {
    const template = {
        images : data,
    }
    try {
        fs.writeFileSync(pathJSON, JSON.stringify (template ,null , 4 ), 'utf-8')
    } catch (err) {
        console.log(err)
    }
}

const {images} = readJSON()



// 

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images')
    },
    filename: (req, file, cb) => {
        const name = req.body.nombre.replace(/ /g, '_');
        const ext = file.originalname.split(".").pop()
        cb(null, `${name}_${Date.now()}.${ext}`);
    }
})

const upload = multer({storage: storage})

app.post('/lugares', upload.array('photos'), (req, res) => {
    const files = req.files;
    console.log('PHOTOS: ', files);
    console.log('LUGAR: ', req.body)
    const id = uniquid();
    const fecha = new Date();
    images.push({
        "id" : id,
        "photos" : req.files ? req.files.map(file => file.filename).toString() : null,
        "fecha" : fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes()
    })
    writeJSON(images)
    const q = "INSERT INTO lugares (`nombre`,`desc`, `photos`) VALUES (?)"
    const values = [
        req.body.nombre,
        req.body.desc,
        id
    ]
    db.query(q,[values],(err)=>{
        if(err){
            console.log(err)
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
    const q = "UPDATE lugares SET `nombre` = ?, `desc` = ? WHERE id = ?"
    const values = [
        req.body.nombre,
        req.body.desc,
    ]
    db.query(q,[...values,lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        res.json("El lugar se ha actualizado correctamente")
    })
})

app.listen(BACKEND_PORT, ()=>{
    console.log(`Backend server is running on port ${BACKEND_PORT} and frontend on ${FRONTEND_URL}`);
})   