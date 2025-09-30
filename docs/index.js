let interactionOne = document.getElementById('bow')
let nav = document.getElementById('head')
let display = document.getElementById('opening')

interactionOne.addEventListener('click', pop)

function pop(){
    display.style.bottom = '100%'
    setTimeout(function (){
        display.style.display = 'none'
    }, 1000)
    document.body.style.backgroundColor = 'white'
}