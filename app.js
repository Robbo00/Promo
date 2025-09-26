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
const file = path.join(folder, "submissions.json")
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

export async function listStudents(){
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

    let name = String(input.Name || '').trim()
    let email = String(input.Email || '').trim()
    let area = String(input.Interest || '').trim()

    if(!name) {errors.push('First name is required')}
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required")
    if(!area) {errors.push('Area is required')}

    const capitalize = (s) => s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()

    return{
        fullName: capitalize(name),
        email: email.toLowerCase(),
        area: area
    }

}

function genId(){
    return (Date.now().toString(36)+Math.random().toString(36).slice(2,8).toUpperCase())
}

export async function addStudent(input){
    let clean = dataValidation(input)
    console.log(clean)
    const Student = {
        id: genId(),
        ...clean,
        createdAt: new Date().toISOString()
    }
    console.log(Student)

    const list = await listStudents()
    list.push(Student)
    console.log(list)
    await fs.writeFile(file, JSON.stringify(list, null, 2), "utf-8")
}

app.get('/api/student', async (req,res,next) =>{
    try{
        const students = await listStudents()
        res.status(200).json({count: students.length, students})
    }
    catch(err){
        next(err)
    }
})

app.post('/api/student', async (req,res,next)=>{
    try{
        const data = req.body
        const created = addStudent(data)
        res.status(201).json({message: 'added', list: listStudents()})
    }
    catch(err){
        next(err)
        res.status(404)
    }
})

app.listen(5001, ()=>{
    console.log('http://localhost:5001')
})