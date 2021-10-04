/* 
    DESAFIO 09 COMPLEMENTARIO: Generar HTML

    - Cuando se hace click en un botón y se agrega un producto al pedido,  hacer visible un indicador en el cart que muestre que hay un item en el carrito
    - Que este indicador se actualice con la cantidad de pedidos a medida que se agregan más productos (pedidoArray.length)

*/



// --------- VARIABLES ---------
const COSTO_ENVIO = 150;
let pedidoArray = [];
let totalPedido = 0;
let totalAPagar = 0;
let estadoCostoEnvio;

// Variables elementos HTML
let $menuCards = document.getElementById('menu-cards');
let $pedido = document.getElementById('pedido');
let $pedidoItems = document.getElementById('pedido-items');
let $pedidoEstado = document.getElementById('pedido-estado');
let $totalPedido = document.createElement('p');
let $costoEnvio = document.createElement('p');
let $totalAPagar = document.createElement('p');
let $tiempoPreparacion = document.createElement('p');
let $cardsMenu;
let $cartIndicador = document.querySelector('.cart__indicador');


// --------- FUNCIONES ---------

// Imprimir cards de producto en #menu-cards
for(item of productos){
    let $card = document.createElement('div');
    $card.classList.add('col');
    $card.innerHTML = `
        <div class="card h-100" id="${item.id}">
            <img src="./img/img_${item.id}.jpg" class="card-img-top" alt="${item.descripcion}">
            <div class="card-body">
                <div class="mb-2">
                    <h3 class="card__title">${item.nombre}</h3>
                    <p class="card__description">${item.descripcion}</p>
                </div>
                <div class="card__bottom-info">
                    <div class="card__price mb-3">
                        <p class="card__price__text">${item.piezas} piezas</p>
                        <p class="card__price__amount">$${item.precio}</p>
                    </div>
                    <button class="btn btn__secondary btn__card-pedido">Agregar a pedido</button>
                </div>  
            </div>
        </div>
    </div>`;
    $menuCards.appendChild($card);
}

// Recuperar info de la card al hacer click en el btn
// Una vez que carga el documento, se obtienen las cards en $cardMenu
// para poder asignarles eventos
window.addEventListener('load', (e)=>{
    $cardsMenu = document.querySelectorAll('.card');
    // Agrega eventListener a cada card
    $cardsMenu.forEach(card => {
        card.addEventListener('click', (e) =>{
            // Hace que el eventListener se active solo al clickear el btn de agregar pedido
            if(e.target.matches('.btn__card-pedido')){
                // Obtiene objeto producto en base al id
                let objetoProducto = buscarObjetoPorId(card.id);
                agregarProductoAPedido(objetoProducto);
                calcularTotalPedido(pedidoArray);
                mostrarEstadoPedido();
                agregarProductoADetallePedido(objetoProducto);
            }
        })
    });
});

// Buscar la info de producto en productos[] con el id de la card
const buscarObjetoPorId = (id) => {
    let objeto = productos.find(producto => producto.id === id);
    return objeto;
}

// Agregar producto elegido a pedidoArray
const agregarProductoAPedido = (objeto) =>{
    pedidoArray.push(objeto);
    activarIndicadorCart();
};

// Activar indicador cart para que muestre cantidad productos agregardos a carrito
const activarIndicadorCart = () =>{
    if(pedidoArray.length > 0){
        $cartIndicador.classList.remove('d-none');
        $cartIndicador.innerHTML = pedidoArray.length;
    }
};

// Calcular total pedido
const calcularTotalPedido = (array) =>{
    totalPedido = 0;
    for(item of array){
        totalPedido += item.precio;
    }
    return totalPedido;
}

// Calcular costo de envío
const calcularCostoEnvio = (totalPedido) => {
    if(totalPedido < 2000){
        estadoCostoEnvio = `Costo de envío: $${COSTO_ENVIO}`;
        totalAPagar = totalPedido + COSTO_ENVIO;
    } else if(totalPedido >= 2000){
        estadoCostoEnvio = 'Costo de envío: ¡Envío bonificado!';
        totalAPagar = totalPedido;
    } 
};

// Calcular tiempo preparación de pedido 
const calcularTiempoPreparacionPedido = (array) => {
    let cantidadPiezas = 0;
    for(item of array){
        cantidadPiezas += item.piezas;
    }
    if(cantidadPiezas <= 20) {
        return '15 minutos';
    } else if(cantidadPiezas > 20 && cantidadPiezas <= 40) {
        return '15 a 30 minutos';
    } else if(cantidadPiezas > 40 && cantidadPiezas <= 60){
        return '30 a 45 minutos';
    } else if(cantidadPiezas > 60 && cantidadPiezas <= 80){
        return '45 a 60 minutos';
    } else if(cantidadPiezas > 80 && cantidadPiezas <= 100){
        return '60 a 75 minutos';
    } else if(cantidadPiezas > 100){
        return '90 minutos';
    } else if(cantidadPiezas > 300){
        return '120 minutos';
    }
}

// Mostrar estado del pedido
const mostrarEstadoPedido = () => {
    // Hacer visible section pedidos cuando haya al menos un pedido añadido
    if(pedidoArray.length > 0){
        $pedido.classList.remove('d-none');
    }

    totalPedido = calcularTotalPedido(pedidoArray);
    $totalPedido.innerHTML = `Total pedido: $${totalPedido}`;
    $pedidoEstado.appendChild($totalPedido);

    calcularCostoEnvio(totalPedido);
    $costoEnvio.innerHTML = `${estadoCostoEnvio}`;
    $pedidoEstado.appendChild($costoEnvio);

    $totalAPagar.innerHTML = `Total a pagar: $${totalAPagar}`;
    $pedidoEstado.appendChild($totalAPagar);

    let tiempo = calcularTiempoPreparacionPedido(pedidoArray);
    if(pedidoArray.length > 0){
        $tiempoPreparacion.innerHTML = `Tiempo estimado de preparación: ${tiempo}`;
        $pedidoEstado.appendChild($tiempoPreparacion);
    } 
}

// Agrega listado de pedido[] a HTML 
const agregarProductoADetallePedido = (objeto) =>{
    let detalle = `1 ${objeto.nombre}: $${objeto.precio}`;
    let $pedidoItem = document.createElement('li');
    $pedidoItem.innerHTML = detalle;
    $pedidoItems.appendChild($pedidoItem);
}

