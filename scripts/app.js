console.log(data);

// let contenedorHTML = document.getElementById('containerCards')
// let search = document.getElementById('searchBar')

// let categoryChecks = document.querySelectorAll('input[type=checkbox][name=category]')
// let filterLitsCategory = new Array(categoryChecks.length);

// categoryChecks.forEach(function(checkbox) {

//   checkbox.addEventListener("change", function(index){
//     if (this.checked) {
//       filterLitsCategory.push(this.value);
//     } else {
//       filterLitsCategory.slice(this.value);
//     }
//   })

// })

// TODO
// generar funcion para el filtrado
// llamar a funcion de filtrado desde el listener
// agregar un filtro (u otra lista para filtro de input) para la busqueda por inputbox
// si es necesario que esten los datos cargados al inicio, llamar a la funcion al cargar

// console.log(filterLitsCategory);
// const printcard = data.events
// .filter(d => {
//   filterLitsCategory.includes(d.category)
// })
// .filter({
//   // filtro por input
// })
// .map(event =>([ contenedorHTML.innerHTML +=
//     `
//     <article class="card" style="width: 25rem">
//     <img
//       src="${event.image}"
//       class="card-img-top p-2"
//       alt="${event.name}"
//       height="60%"
//     />
//     <h5 class="card-title text-center">${event.name}</h5>
//     <p class="card-text text-center">${event.description}
//     </p>
//     <div class="d-flex justify-content-evenly">
//       <p>Precio US$${event.price}</p>
//       <a href="#" class="btn btn-primary">Go somewhere</a>
//     </div>
//   </article>
//     `
// ]))

// search.addEventListener('keyup',e =>{

//   let inputSearch = (e.target.value.toLowerCase())//toma el valor de la tecla escrita.
//   let filterInput = events.filter(event => event.name.toLowerCase().includes(inputSearch.toLowerCase()))
//   cardsFilters.innerHTML

// })
let containerCards = document.getElementById("containerCards");

function printCard(array, container) {
  array.forEach((evento) => {
    container.innerHTML += `
    <article class="card" style="width: 25rem">
            <img
              src=${evento.image}
              class="card-img-top p-2"
              alt=${evento.name}
              height="60%"
            />
            <h5 class="card-title text-center">${evento.name}</h5>
            <p class="card-text text-center">${evento.description}</p>
            <div class="d-flex justify-content-evenly">
              <p>Precio US$ ${evento.price}</p>
              <a href="/pages/details.html?id=${evento._id}" class="btn btn-primary">Go somewhere</a>
            </div>
          </article>
          `;
  });
}
printCard(data.events, containerCards);

//codigo checkbox

let categorias = document.getElementById("boxes");

let checkbox = new Set(data.events.map((evento) => evento.category));

checkbox = [...checkbox];

checkbox.forEach((nombreCategoria) => {
  categorias.innerHTML += `
    <div class="form-check">
        <input class="form-check-input" id="${nombreCategoria}" type="checkbox">
        <label class="form-check-label" for="${nombreCategoria}">${nombreCategoria}</label>
    </div>
    `;
  console.log(checkbox);
});

let listCheck = [];

categorias.addEventListener(`click`, (e) => {
  if (e.target.checked) {
    listCheck = listCheck.concat(
      data.events.filter((evento) =>
        evento.category.toLowerCase().includes(e.target.id.toLowerCase())
      )
    );
    containerCards.innerHTML = "";
    printCard(listCheck, containerCards);
  } else if (!e.target.checked) {
    listCheck = listCheck.filter(
      (evento) =>
        !evento.category.toLowerCase().includes(e.target.id.toLowerCase())
    );
    containerCards.innerHTML = "";
    printCard(listCheck, containerCards);
  }
  if (listCheck.length === 0) {
    printCard(data.events, containerCards);
  }
});

//entrada texto input

let search = document.getElementById("inputSearch");
search.addEventListener("keyup", (cambiosDelEvento) => {
  let inputUser = cambiosDelEvento.target.value;
  let filtro = [];
  if (listCheck.length !== 0) {
    filtro = listCheck.filter((objetoEvento) =>
      objetoEvento.name.toLowerCase().includes(inputUser.toLowerCase())
    );
  }else{
    filtro = data.events.filter((objetoEvento) =>
    objetoEvento.name.toLowerCase().includes(inputUser.toLowerCase())
  )}
  containerCards.innerHTML = "";
  printCard(filtro, containerCards);
});


