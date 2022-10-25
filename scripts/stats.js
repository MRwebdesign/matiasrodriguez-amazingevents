// let tableNumber1 = document.getElementById('tableNumber1')
// let tableNumber2 = document.getElementById('tableNumber2')
// let tableNumber3 = document.getElementById('tableNumber3')





const printTable1 = (minPercentAssistance, maxPercentAssistance, maxCapacity, container,) => {
    container.innerHTML = `
      <tr>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${minPercentAssistance.name}</td>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${maxPercentAssistance.name}</td>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${maxCapacity.name}</td>
      </tr>
      <tr>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${minPercentAssistance.percent}%</td>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${maxPercentAssistance.percent}%</td>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${maxCapacity.percent}</td>   
      </tr>
      `
      ;
  };
  
  
  const printTable2and3 = (array, container) => {
    array.forEach((element) => {
      container.innerHTML += `
      <tr>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${element.category}</td>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">US$ ${element.gain}</td>
          <td scope="col" class="col-3 justify-content-center align-items-center text-center fw-normal">${element.prom}%</td>   
      </tr>`
          ;
    });
  };

  let events;
const table1 = async (container) => {
  let response = await fetch(
    `https://mh-amazing.herokuapp.com/amazing?time=past`
  );
  let data = await response.json();
  let events = data.events;
  events.map((event) => {event.percent = (100 * event.assistance) / event.capacity;});
  events = events.sort((event1, event2) => event1.percent - event2.percent);
  let minPercent = events[0];
  let maxPercent = events[events.length - 1];
  events = events.sort((event1, event2) => event1.capacity - event2.capacity);
  let maxCapacity = events[events.length - 1];
  printTable1(minPercent, maxPercent, maxCapacity, tableNumber1);
};
table1("tableNumber1");

const table2and3 = async (time, property, container) => {
    let response = await fetch(`https://mh-amazing.herokuapp.com/amazing?time=${time}`)
    let data = await response.json()
    let events = data.events
    events.map(event => {
        event.gain = (event[property] * event.price)
        event.percent = (100 * event[property] / event.capacity).toFixed(2)
    })
    let categories = new Set(events.map(event => event.category))
    categories = [...categories]
    let stats = categories.map(categories => {
        let filter = events.filter(event => event.category===categories)
        return reduceStats(filter,property)
    })
    printTable2and3(stats, container)
}
table2and3("past", "assistance", tableNumber3)
table2and3("upcoming", "estimate", tableNumber2)

let reduceStats = (array, property) => {
    let initialTable = {
      category: "",
      gain: 0,
      capacity: 0,
      [property]: 0,
    };
    let statsCalculated = array.reduce((element1, element2) => {
      return {
        category: element2.category,
        gain: element1.gain + element2.gain,
        capacity: element1.capacity + element2.capacity,
        [property]: element1[property] + element2[property],
      };
    }, initialTable);
    statsCalculated.prom = (100 * statsCalculated[property] / statsCalculated.capacity).toFixed(2);
    return statsCalculated;
  };
