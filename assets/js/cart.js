// array productos
import { productos } from "./api.js";
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || []


// Elementos del dom

// Elementos a comprar | detalle y precio
const $shopTitle = document.getElementById('cartTitle')
const $prodsAddedContainer = document.getElementById('cartItems')
const $prodsAddPrice = document.getElementById('cartItemPrice')

// Precio final de compra
const $finalPrice = document.getElementById('totalShop')

// Metodos de pago
const $paymentMethods = document.getElementById('payment')
const $btnPay = document.getElementById('btnPay')
const creditCards = ['Mercado Pago','Visa','MasterCard']


// Llenando datos en el DOM

$paymentMethods.innerHTML += metodosPago(creditCards)






$btnPay.addEventListener('click', () => {

    $prodsAddedContainer.innerHTML = `Compra realizada`
    localStorage.removeItem('cartProducts')
    $finalPrice.textContent = `$ 0`
    
})

// Funciones
llenarCartData(cartProducts)
//Estructura a completar con productos
function cartData(product){
    
    return `
        <div class="separador">
            <div class="cartItemsDetail">
                <button class="closeX" data-id="${product.id}"><img class="closeX" data-id="${product.id}" src="../assets/img/cross.png" alt="x">
                </button>
                <p class="prodName">${product.nombre}</p>
                <p class="prodCant">${product.cantidad} unidades</p>
            </div>
            <p class='cartItemPrice'>$ ${product.precio}</p>
        </div>
    `
    
}


// 
$prodsAddedContainer.addEventListener('click', (e)=>{
    console.log('Hola')
    if(e.target.dataset.id != undefined){
        console.log('adios')
        quitarFavoritos(e.target.dataset.id)
        llenarCartData(cartProducts)
    }
    

})


//LLenar con productos desde LS
function llenarCartData(productos){
    
    let articulos = ''

    for(let articulo of productos){
        let precio = articulo.producto.precio * articulo.quantity
        let cantidad = articulo.quantity
        const productoAdd = {
            id: articulo.producto._id,
            nombre: articulo.producto.producto,
            cantidad: cantidad,
            precio: precio
        }
        articulos += cartData(productoAdd)
        
    }
    $prodsAddedContainer.innerHTML = articulos
    if (cartProducts.length != 0 ){
        $shopTitle.textContent = `Productos a comprar` 
    }else {
        $shopTitle.textContent = `Sin productos añadidos` 
    }
    $finalPrice.textContent = `$ ${llenarTotal()}`

    
}
function llenarTotal(){
    const total = cartProducts.reduce((acumulador,producto) => acumulador + (producto.producto.precio * producto.quantity) ,0)
    return total 
}

function quitarFavoritos(id){
    cartProducts = cartProducts.filter((product) => product.producto._id != id) 
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts))
}







//Añadir metodos de pago

function cardsOptions(card){
    return `<option value='${card}'> ${card} </option> ` 
}

function metodosPago(cards){
    let fill = ''
    for(let card of cards){
        fill += cardsOptions(card)
    }
    return fill
}
