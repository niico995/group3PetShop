// array productos
import { productos } from "./api.js";

// Elementos del dom

// Elementos a comprar | detalle y precio
const $shopTitle = document.getElementById('cartTitle')
const $prodsAddedContainer = document.getElementById('cartItemsDetail')
const $prodsAddPrice = document.getElementById('cartItemPrice')

// Precio final de compra
const $finalPrice = document.getElementById('totalShop')

// Metodos de pago
const $paymentMethods = document.getElementById('payment')
const $btnPay = document.getElementById('btnPay')
const creditCards = ['Mercado Pago','Visa','MasterCard']


// Llenando datos en el DOM

$paymentMethods.innerHTML += metodosPago(creditCards)





// Funciones

//Estructura a completar con productos
function cartData(product){

}



// 



//LLenar con productos desde LS


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
