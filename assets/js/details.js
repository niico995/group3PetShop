import { productosFarmacia } from "./farmacia.js";
console.log(productosFarmacia);

 const params = new URLSearchParams(location.search);
 const id = params.get(`id`);
 console.log(id);
 const productoId = productosFarmacia.find((producto) => producto._id === id);
 console.log(productoId);

 const $containerDetails = document.getElementById (`containerDetails`)
 
 const disponiblesTexto =productoId.disponibles < 5
   ? `<p>Disponibles: ${productoId.disponibles} ¡Pocas unidades!</p>`
   : `<p>Disponibles: ${productoId.disponibles}</p>`;
const estadoDisponibilidad =productoId.disponibles === 0
   ? `<p>Producto agotado</p>`
   : disponiblesTexto;


$containerDetails.innerHTML = `

<img src=${productoId.imagen} alt="imagen">
<h1>${productoId.producto}</h1>
<p>Precio: $${productoId.precio}</p>
<p>${productoId.descripcion}</p>
${estadoDisponibilidad}

`