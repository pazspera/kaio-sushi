/* 
    Cuando hago click en el btn de comprar, quiero que el menú
    de pedido se contraiga

    Add an eventListener al btn del pedido
    Agregarle un id a ese btn
    Cuando se hace click en ese btn, que se cierre el offcanvas
    Ver qué es lo que hace que offcanvas cierre

*/

let $btnComprar = document.getElementById('btn-comprar');
let $btnPedidoClose = document.getElementById('btn-pedido-close');
let $pedidoOffcanvas = document.getElementById('offcanvasRight');


$btnComprar.addEventListener('click', () => {
    console.log('click btn comprar');
    console.log($pedidoOffcanvas);
    return $pedidoOffcanvas.classList.remove('show');
})