/* 
    Al hacer click en el btn-comprar, guardar el pedido en local storage
    Usar la info del local storage para imprimir el detalle de pedido en la parte izquierda de compra.html
    En la parte derecha de compra.html, tener el formulario con los datos a completar:
    - Nombre
    - Email
    - Dirección
    - Teléfono

    Info tarjeta: 
    - Número de tarjeta
    - Nombre Titular
    - Desde
    - Hasta
    - Cvc  
*/


let $fragmentoPedidoCompra = document.createDocumentFragment();
let $listadoPedido = document.getElementById('listadoPedido');

// Al cargar el documento, recupera el pedido guardado en el local storage
// y lo muestra en la sección
/* window.addEventListener('load', (e)=>{
    imprimirCards(menuPiezas);
    agregarEventosBtnCards();
}); */
window.addEventListener('load', (e) => {
    imprimirPedido();
})

const imprimirPedido = () => {
    let pedido = JSON.parse(localStorage.getItem('pedido'));
    console.log(pedido);
    for(producto of pedido){
        let $item = document.createElement('p');
        let detalle = `${producto.contadorProductoEnPedido} ${producto.nombre}: $${formatoCurrency(producto.precio)}`;
        console.log(detalle);
        $item.innerHTML = detalle;
        $fragmentoPedidoCompra.appendChild($item);
    }
    $listadoPedido.appendChild($fragmentoPedidoCompra);
}