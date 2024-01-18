import { productos } from "./api.js";
const $containerId = document.getElementById("container1");
const $inputText = document.getElementById(`inputText`);

function cardMaker(productos, $containerId) {
  if ($containerId) {
    $containerId.innerHTML = "";
    const cardHtml = productos.reduce((acumulador, producto) => {
      const disponiblesTexto =
        producto.disponibles < 5
          ? `<p class="stock">Disponibles: ${producto.disponibles} ¡Pocas unidades!</p>`
          : `<p class="stock">Disponibles: ${producto.disponibles}</p>`;
      const estadoDisponibilidad =
        producto.disponibles === 0
          ? `<p class="stock">Producto agotado</p>`
          : disponiblesTexto;

      return `${acumulador}
            <article class="product_card">
            <img src=${producto.imagen} alt="imagen">
            <h1>${producto.producto}</h1>
            <p class="price">$${producto.precio}</p>
            ${estadoDisponibilidad}
            <a href="./detallesJuguetes.html?id=${producto._id}">
          <div class="button_container">  
           <button type="button" class="detailsBtn">🐾Detalles</button>
           </a>
           <div class="add_number_container">
           <button id="${producto._id}" class="addToCartBtn"> 🛒 Añadir al carrito</button>
           <input type="number" id="quantity_${producto._id}" class="cart_number" min="1" value="1">
          </div>
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





