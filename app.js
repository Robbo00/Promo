let express = require('express')
let path = require('path')
const app = express()

app.use(express.static(__dirname))

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '1',  '/index.html'))
})

app.listen(5000, ()=>{
    console.log('http://localhost:5000')
})

