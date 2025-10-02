import express from 'express'
import { readFile } from 'fs/promises'
import fs from 'fs/promises'
import path from 'path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use( express.static(path.join(__dirname, 'docs')))

const PORT = 5500

const folder = path.join(__dirname, 'data')
const file = path.join(folder, "admin.json")


app.get('/api/admin', async (req,res,next) =>{
    try{
        // res.redirect('/admin.html')
        res.render('/admin.html', {blue: 'red'})
    }
    catch(err){
        next(err)
    }
})

app.post('/api/admin/auth/login', async (req,res,next)=>{
    try{
        const data = req.body
        if(data.email == 'red@gmail.com' && data.pass == 'blue'){
            let m = await fs.readFile(file, 'utf-8')
            res.redirect('/admin.html')
            res.render('/admin.js', {file: 'red'})
        }
        else{
            res.status(401).json({note: 'Wrong credentials'})
        }
    }
    catch(err){
        next(err)
        res.status(404).json({note: err})
    }
})

app.listen(5001, ()=>{
    console.log('http://localhost:5001')
})