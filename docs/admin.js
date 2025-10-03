let table = document.getElementById('tree')
document.addEventListener(onload, get())

function get(){
      fetch('/api/admin/data')
      .then(response => response.json())
      .then(data=>{
        let rip = JSON.parse(data.dat)
        console.log(rip[0].id)
        for (let i = 0; i < rip.length; i++) {
          let spec = document.createElement('tr')
          spec.innerHTML = `<tr><td>${rip[i].id}</td><td>${rip[i].fullName}</td><td>${rip[i].email}</td><td>${rip[i].area}</td><td>${rip[i].createdAt}</td></tr>` 
          table.appendChild(spec)
        }
     })   
}

