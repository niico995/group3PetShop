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
           <button id="${producto._id}" class="addToCartBtn"> AÑADIR AL CARRITO   </button>
           </article>`;
    }, "");
    $containerId.innerHTML = cardHtml;
  }
  const addToCartButton = document.querySelectorAll('.addToCartBtn');
    addToCartButton.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.id;
        addToCart(productId);
        console.log(productId);
      });
    });
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



function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

  if (!cartProducts.includes(productId)) {
    cartProducts.push(productId);

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

    console.log(`Producto con ID ${productId} añadido al carrito.`);
  } else {
    console.log(`El producto con ID ${productId} ya está en el carrito.`);
  }
}





