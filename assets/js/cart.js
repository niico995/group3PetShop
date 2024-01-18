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

$finalPrice.innerHTML = `$ ${llenarTotal()}`


if (cartProducts == [] ){
    $shopTitle.innerHTML = `Productos a comprar` 
}else {
    $shopTitle.innerHTML = `Sin productos añadidos` 
}


$btnPay.addEventListener('click', () => {

    $prodsAddedContainer.innerHTML = `Compra realizada` 
})

// Funciones
llenarCartData(cartProducts)
//Estructura a completar con productos
function cartData(product){
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || []
    let add = false
    cartProducts.forEach(product =>  {
        product.producto._id == product.id
        add = true
    });
    if(add){
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
    } else {
        return `
        ` 
    }
}


// 
$prodsAddedContainer.addEventListener('click', (e)=>{
    console.log('Hola')
    if(e.target.dataset.id != undefined){
        console.log('adios')
        quitarFavoritos(e.target.dataset.id)
        llenarCartData(cartProducts)
    }
    llenarCartData(cartProducts)

})


//LLenar con productos desde LS
function llenarCartData(productos){
    
    
    for(let articulo of productos){
        let precio = articulo.producto.precio * articulo.quantity
        let cantidad = articulo.quantity
        const productoAdd = {
            id: articulo.producto._id,
            nombre: articulo.producto.producto,
            cantidad: cantidad,
            precio: precio
        }
        $prodsAddedContainer.innerHTML += cartData(productoAdd)
        
    }
    
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
