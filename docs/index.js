let interactionOne = document.getElementById('bow')
let nav = document.getElementById('head')
let display = document.getElementById('opening')
let opt = document.getElementById('options')
let prod = document.getElementById('products')
let h = document.getElementById('head')
let past = null
// import fs from 'fs/promises'
// import path from 'path'
// import { fileURLToPath } from 'url'

interactionOne.addEventListener('click', pop)

function pop(){
    display.style.bottom = '120%'
    setTimeout(function (){
        display.style.display = 'none'
    }, 1000)
    // document.body.style.backgroundColor = 'white'
    document.body.style.backgroundColor = '#1c1b1b'
    h.style.backgroundColor = 'black'
    prod.style.display = 'flex'
    
    setTimeout(() => {
        prod.style.top = '8.3%'
    }, 200); 
    // generate()
}
  
function expand(id){
    let rud = document.getElementById(id)
    try{
            past.style.width = '18%'
    }
    catch (err){
        console.log('go')
    }
    rud.style.width = '40%'

    past = document.getElementById(id)
}

// async function generate(){

// }