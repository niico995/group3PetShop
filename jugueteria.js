import { productos } from "./api.js";
const $containerId = document.getElementById("container1");
const $inputText = document.getElementById(`inputText`);

function cardMaker(productos, $containerId) {
  if ($containerId) {
    $containerId.innerHTML = "";
    const cardHtml = productos.reduce((acumulador, producto) => {
      const disponiblesTexto =
        producto.disponibles < 5
          ? `<p>Disponibles: ${producto.disponibles} ¡Pocas unidades!</p>`
          : `<p>Disponibles: ${producto.disponibles}</p>`;
      const estadoDisponibilidad =
        producto.disponibles === 0
          ? `<p>Producto agotado</p>`
          : disponiblesTexto;

      return `${acumulador}
            <article>
            <img src=${producto.imagen} alt="imagen">
            <h1>${producto.producto}</h1>
            <p>Precio: $${producto.precio}</p>
            <p>${producto.descripcion}</p>
            ${estadoDisponibilidad}
            <a href="./details.html?id=${producto._id}">  
           <button type="button">DETAILS</button>
           </a>
            </article>`;
    }, "");
    $containerId.innerHTML = cardHtml;
  }
}

export const productosJugueteria = productos.filter(
  (producto) => producto.categoria === "jugueteria"
);

cardMaker(productosJugueteria, $containerId);

if ($inputText) {
  $inputText.addEventListener("input", () => {
    const searchTerm = $inputText.value.toLowerCase();
    const productosFiltrados = productosJugueteria.filter((producto) =>
      producto.producto.toLowerCase().includes(searchTerm)
    );

    cardMaker(productosFiltrados, $containerId);
  });
}
