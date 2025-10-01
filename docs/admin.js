
let dat = ''
document.addEventListener(onload, get())

function get(){
      fetch('/data/submissions.json')
     await .then(response => response.json())
     await .then(data=>{
        dat = data
     })
    console.log(dat)
}