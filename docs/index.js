let interactionOne = document.getElementById('bow')
let nav = document.getElementById('head')
let display = document.getElementById('opening')
let opt = document.getElementById('options')
let prod = document.getElementById('products')
let past = null

interactionOne.addEventListener('click', pop)

Later
// function pop(){
//     display.style.bottom = '120%'
//     setTimeout(function (){
//         display.style.display = 'none'
//     }, 1000)
//     document.body.style.backgroundColor = 'white'
//     opt.style.color = 'black'
//     prod.style.display = 'flex'
    
//     setTimeout(() => {
//         prod.style.top = '8.3%'
//     }, 200); 
// }
  
// function expand(id){
//     let rud = document.getElementById(id)
//     try{
//             past.style.width = '18%'
//     }
//     catch (err){
//         console.log('go')
//     }
//     rud.style.width = '40%'

//     past = document.getElementById(id)
// }