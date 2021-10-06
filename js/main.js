/* 
    DESAFIO 09 COMPLEMENTARIO: Generar HTML

    -   En la primera función genero las cards de los productos en base al
        array de productos, creo los elementos html y añado el contenido 
        dinámicamente con innerHTML. También en mostrarEstadoPedido() agrego
        elementos HTML en base a la información del pedido actual
    -   Adicionalmente, para este desafío cree la función activarIndicadorCart(). 
        Al agregar un producto, se hace visible el indicador de productos
        que muestra la cantidad de productos que hay en el pedido
    -   El indicador se actualiza dinámicamente en base a la cantidad de items
        agregados al array pedidoArray

    -   El item de pedido se agrega con un icono para eliminar pedido
    -   Agregar eventListener al item para que cuando se haga click se busque el array pedido por id del item y eliminarlo del pedido array
    -   En cart indicador, cuando sea cero hacer que vuelva a tener display: none

*/



// --------- VARIABLES ---------
const COSTO_ENVIO = 150;
let pedidoArray = [];
// pedidoId va a generar un id a cada pedido que se agregue
// a pedidoArray
let pedidoId = 0;
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
    // Inicializa pedidoId a 0 para asegurar que funcione
    // bien la asignación dinámica de pedidoId en pedidoArray
    pedidoId = 0;
    console.log(`pedidoId ${pedidoId}`);
    $cardsMenu = document.querySelectorAll('.card');
    // Agrega eventListener a cada card
    $cardsMenu.forEach(card => {
        card.addEventListener('click', (e) =>{
            // Hace que el eventListener se active solo al clickear el btn de agregar pedido
            if(e.target.matches('.btn__card-pedido')){
                // Obtiene objeto producto en base al id
                let objetoProducto = buscarObjetoPorId(card.id);
                // Hago una copia del objeto a agregar con JSON.parse
                // y JSON.stringify para asegurar que cada producto
                // del array tenga su propio id
                let copiaObjetoProducto = JSON.parse(JSON.stringify(objetoProducto));
                agregarProductoAPedido(copiaObjetoProducto);
                calcularTotalPedido(pedidoArray);
                mostrarEstadoPedido();
                agregarProductoADetallePedido(copiaObjetoProducto);
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
const agregarProductoAPedido = (copiaObjetoProducto) =>{
    // pedidoId crear un id para cada producto dentro de
    // pedidoArray, de esa manera puedo buscar a cada
    // producto específico al momento de eliminarlos
    // del carrito
    copiaObjetoProducto.pedidoId = pedidoId;
    pedidoId++;
    pedidoArray.push(copiaObjetoProducto);
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
    // Crea contenedor para el item de pedido
    let $pedidoItem = document.createElement('div');
    $pedidoItem.classList.add('pedido__item');
    // Crea icono para el item de pedido
    let $pedidoIcon = document.createElement('i');
    $pedidoIcon.classList.add('far');
    $pedidoIcon.classList.add('fa-trash-alt');
    
    // Agregar icono a $pedidoItem
    $pedidoItem.appendChild($pedidoIcon);
    
    // Crea detalle del pedido
    let detalle = `1 ${objeto.nombre}: $${objeto.precio}`;
    let $pedidoDetalle = document.createElement('p');
    $pedidoDetalle.innerHTML = detalle;
    // Agrega detalle pedido a $pedidoItem
    $pedidoItem.appendChild($pedidoDetalle);

    // Agrega el item completo a listado $pedidoItems
    $pedidoItems.appendChild($pedidoItem);

    // Agrega eventListener al $pedidoIcon para eliminar items
    $pedidoItem.onclick = () => {
        console.log('eliminar');
        eliminarProductoDePedido(objeto);
    }
}

// Elimina producto de pedidoArray
const eliminarProductoDePedido = (objeto) => {
    // Devuelva objeto.nombre y posicion en pedidoArray
    // index = a.findIndex(x => x.prop2 ==="yutu");
    console.log(objeto);
    let indexObjeto = pedidoArray.findIndex(x => x.pedidoId === objeto.pedidoId);
    console.log(`Nombre: ${objeto.nombre} Pedido Id: ${objeto.pedidoId} Index: ${indexObjeto}`);

}

