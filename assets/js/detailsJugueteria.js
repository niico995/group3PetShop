import { productosJugueteria } from "./jugueteria.js";
console.log(productosJugueteria);

 const params = new URLSearchParams(location.search);
 const id = params.get(`id`);
 console.log(id);
 const productoId = productosJugueteria.find((producto) => producto._id === id);
 console.log(productoId);

 const $containerDetails = document.getElementById (`containerDetails`)
 
 const disponiblesTexto =productoId.disponibles < 5
   ? `<p id="stock">Disponibles: ${productoId.disponibles} ¡Pocas unidades!</p>`
   : `<p id="stock">Disponibles: ${productoId.disponibles}</p>`;
const estadoDisponibilidad =productoId.disponibles === 0
   ? `<p id="stock">Producto agotado</p>`
   : disponiblesTexto;


$containerDetails.innerHTML = `

<img src=${productoId.imagen} alt="imagen">
<div class="textContent">
<h1>${productoId.producto}</h1>
<p id="price" >$${productoId.precio}</p>
<p id= "description">${productoId.descripcion}</p>
<div>
${estadoDisponibilidad}

`
