
let containerCards = document.getElementById("containerCards");
let search = document.getElementById("inputSearch");
let categorias = document.getElementById("boxes");
// let favoritos= [] 
let upComingEvents 

fetch('https://mh-amazing.herokuapp.com/amazing')
  .then( data => data.json())
  .then( res => {
    console.log(res);
    eventos = res.events
    fechaActual = res.date
    upComingEvents = eventos.filter(e => e.date > fechaActual)
    crearCheckbox(upComingEvents, boxes)
    imprimirCard(upComingEvents, containerCards)
    search.addEventListener('keyup',filtrar)
    categorias.addEventListener('change',filtrar)
  })
  .catch(err => console.log(err))



//crear checkbox

function crearCheckbox (categorias, contenedor){
  let fn = categorias => categorias.category
  let category = new Set(categorias.filter(fn).map(fn))
  // let catEvento = categorias.filter(categorias => categorias.category).map(categorias => categorias.category)
  category.forEach(categoria =>{
    contenedor.innerHTML += `
    
     <label class="d-inline-flex  p-1" for="${categoria}">
     <input class="me-2" type="checkbox" id="${categoria}" value="${categoria}"> ${categoria}
     </label>

    `
  })
}


function crearCard(evento){
  let name = evento.name.replace(' ','')
  let div = document.createElement('div')
  div.classList = ' col-3'
  div.innerHTML = `
  <article class="card" style="width: 25rem">
             <img
               src=${evento.image}
               class="card-img-top p-2"
               alt=${evento.name}
               height="60%"
             />
             <h5 class="card-title text-center">${evento.name}</h5>
             <h5 class="card-title text-center">${evento.category}</h5>
             <div class="d-flex justify-content-evenly">
               <p>Precio US$${evento.price}</p>
              <a href="../pages/details.html?id=${evento.id}" class="btn btn-primary">More details</a>
              <button class="btn btn-primary id="btn-${name}" onclick="handleFavs('${name}')"> agregar fav </>
            </div>
          </article>
  `
  return div
}

//Imprimir Cards

function imprimirCard(eventos, contenedor){
  contenedor.innerHTML = ''
    let fragment = document.createDocumentFragment()
    eventos.forEach(evento => fragment.appendChild(crearCard(evento)))
    contenedor.appendChild(fragment)
}


// Funcion para filtrar 
function filtrar(){
  let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(e => e.value)
  let filtradoPorCategoria = eventos.events.filter(evento => checked.includes(evento.category) || checked.length === 0)
  // let filtradoPorCategoria = eventos.events.filter(evento => checked.includes(evento.category) || checked.length === 0 )
  let filtradoPorSearch = upComingEvents.filter(evento => evento.name.toLowerCase().includes(search.value.toLowerCase()))
  imprimirCard(filtradoPorSearch, containerCards) 
}


