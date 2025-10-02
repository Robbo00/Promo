let dat = ''
console.log(blue)
document.addEventListener(onload, get())

function get(){
      fetch('/data/submissions.json')
      .then(response => response.json())
      .then(data=>{
       console.log(data)
     })   
}

