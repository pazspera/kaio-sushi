
// --------- VARIABLES ---------

let $btnComprar = document.getElementById('btn-comprar');
let $btnPedidoClose = document.getElementById('btn-pedido-close');
let $pedidoOffcanvas = document.getElementById('offcanvasRight');

// --------- FUNCIONES ---------

$btnComprar.addEventListener('click', () => {
    return $pedidoOffcanvas.classList.remove('show');
})