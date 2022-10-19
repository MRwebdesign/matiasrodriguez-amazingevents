let eventId=new URL(window.location.href).searchParams.get('id') //query param, para tomar del lado del detail, se toma la url 
//window location y lo convertimos a una url para que sea interpretada por js y con "searchParam" obtiene todo los parametros
//que traiga despues del signo de interrogación (son parametros)
let detailView = document.getElementById('viewDetail')

let eventDetail = data.events.filter(object =>
    object._id == eventId
)

let evento = eventDetail[0]
detailView.innerHTML =
`
    <article class="card cardDetails mx-5" style="width: 55rem">
            <img
              src=${evento.image}
              class="card-img-top p-2"
              alt=${evento.name}
              height="85%"
            />
            <h5 class="card-title text-center">${evento.name}</h5>
            <p class="card-text text-center">${evento.description}</p>
            <div class="d-flex justify-content-evenly">
            <p>Capacity: ${evento.capacity}</p>
            <p>Place: ${evento.place}</p>
            <p>Date: ${evento.date}</p>
              <p>Precio: US$ ${evento.price}</p>
            </div>
          </article>
          `;