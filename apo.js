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
const file = path.join(folder, "users.json")
ensureDataFile()

export async function ensureDataFile() {
    try{
        await fs.mkdir(folder,{recursive:true})
        await fs.access(file)
    }
    catch{
        await fs.writeFile(file, "[]", "utf-8")
    }
    
}

export async function listUsers(){
    let raw = await readFile(file, 'utf-8')
    try{
        return json.parse(raw)
    }
    catch(err){
        console.log('404 error')
        await fs.writeFile(file, '[]', "utf-8")
        return []
    }
}


function dataValidation(input){
    const errors = []

    let name = String(input.User || '').trim()
    let email = String(input.Email || '').trim()
    let area = String(input.Pass || '').trim()

    if(!name) {errors.push('First name is required')}
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required")
    if(!area) {errors.push('Area is required')}

    const capitalize = (s) => s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()

    return{
        User: name,
        email: email.toLowerCase(),
        password: area
    }

}

function genId(){
    return (Date.now().toString(36)+Math.random().toString(36).slice(2,8).toUpperCase())
}

export async function addUser(input){
    let clean = dataValidation(input)
    console.log(clean)
    const User = {
        id: genId(),
        ...clean,
        createdAt: new Date().toISOString()
    }
    console.log(User)

    const list = await Users()
    list.push(User)
    console.log(list)
    await fs.writeFile(file, JSON.stringify(list, null, 2), "utf-8")
}

app.get('/api/users', async (req,res,next) =>{
    try{
        const users = await listUsers()
        res.status(200).json({count: users.length, users})
    }
    catch(err){
        next(err)
    }
})

app.post('/api/users', async (req,res,next)=>{
    try{
        const data = req.body
        const created = addUser(data)
        res.status(201).json({message: 'added', list: listUsers()})
    }
    catch(err){
        next(err)
        res.status(404)
    }
})

app.listen(5001, ()=>{
    console.log('http://localhost:5003')
})