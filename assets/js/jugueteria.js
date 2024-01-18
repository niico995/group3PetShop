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
            <a href="./detallesJuguetes.html?id=${producto._id}">  
           <button type="button">DETAILS</button>
           </a>
           <input type="number" id="quantity_${producto._id}" min="1" value="1">
           <button id="${producto._id}" class="addToCartBtn"> Añadir al carrito  </button>
           </article>`;
    }, "");
    $containerId.innerHTML = cardHtml;
  }
  const addToCartButtons = document.querySelectorAll('.addToCartBtn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.id;
      const quantityInput = document.getElementById(`quantity_${productId}`);
      const quantity = parseInt(quantityInput.value, 10);

      addToCart(productId, quantity);
    });
  });
  }
////// categoria 
export const productosJugueteria = productos.filter(
  (producto) => producto.categoria === "jugueteria"
);

cardMaker(productosJugueteria, $containerId);

/////////// filtro
if ($inputText) {
  $inputText.addEventListener("input", () => {
    const searchTerm = $inputText.value.toLowerCase();
    const productosFiltrados = productosJugueteria.filter((producto) =>
      producto.producto.toLowerCase().includes(searchTerm)
    );

    cardMaker(productosFiltrados, $containerId);
  });
}


///////// funcion para guardar en el local storage
function addToCart(productId, quantity) {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  const existingProductIndex = cartProducts.findIndex(item => item.productId === productId);

  if (existingProductIndex === -1) {
    cartProducts.push({ productId, quantity });
  } else {
    cartProducts[existingProductIndex].quantity += quantity;
  }
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  console.log(`Producto con ID ${productId}  ${quantity} unidad/unidades añadido al carrito.`);
}





