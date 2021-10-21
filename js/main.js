/* 
    DESAFÍO CLASE 12 - Incorporar jQuery al proyecto

    -   Reescribí la función imprimirCards() (línea 43) para imprimir en el DOM con jQuery
    -   Reescribí la función para hacer el toggle de cards dependiendo de si son piezas o combos con jQuery (línea 121)

    -   Actualicé el funcionamiento del carrito para que se muestre el total de items agregado de cada producto 
        en vez de escribir cada producto individualmente. Hice los cambios en agregarProductoADetallePedido(), 
        eliminarProductoDePedido(), calcularTotalPedido() y calcularTiempoPreparacionPedido()
    
*/


// --------- VARIABLES ---------
const COSTO_ENVIO = 150;
let pedidoArray = [];
// pedidoId va a generar un id a cada pedido que se agregue a pedidoArray
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
let $cart = document.querySelector('.cart__icon');
let $menuPiezas = document.getElementById('menu-piezas');
let $menuCombos = document.getElementById('menu-combos');
let $menuOpciones = document.getElementById('menu-opciones');


// --------- FUNCIONES ---------
// Imprimir cards de producto en #menu-cards
// Función con jQuery
const imprimirCards = (array) => {
    for (item of array){
        $('#menu-cards').append(`
        <div class="col">
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
        </div>`)
    }
}
// Función con Vanilla JS
/* const imprimirCards = (array) => { 
    for(item of array){
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
} */


// Función para agregar event listners a btn de cards
const agregarEventosBtnCards = (e)=>{
    pedidoId = 0;
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
            }
        })
    });
}


// Menú: muestra y oculta cards dependiendo si el btn piezas o combos está activado
// Función con jQuery
$('#menu-opciones').on('click', (e) => {
    if(e.target.matches('#menu-piezas')){
        // Toggle estado activo de los btn 
        $('#menu-piezas').addClass( "menu-active" );
        $('#menu-combos').removeClass( "menu-active" );
        // Toggle estado activo de los btn
        $($menuCards).empty();
        // Imprime cards de menuPiezas
        imprimirCards(menuPiezas);
    }
    
    if(e.target.matches('#menu-combos')){
        console.log('combos');
        // Toggle estado activo de los btn
        $('#menu-combos').addClass('menu-active');
        $('#menu-piezas').removeClass('menu-active');
        // Borra elementos ya impresos
        $($menuCards).empty();
        // Imprime cards de menuCombos
        imprimirCards(menuCombos);
    }

    agregarEventosBtnCards();
})
// Función con Vanilla JS
/* $menuOpciones.addEventListener('click', (e) =>{
    if(e.target.matches('#menu-piezas')){
        // Toggle estado activo de los btn 
        $menuPiezas.classList.add('menu-active');
        $menuCombos.classList.remove('menu-active');
        // Toggle estado activo de los btn
        $($menuCards).empty();
        // Imprime cards de menuPiezas
        imprimirCards(menuPiezas);
    }
    
    if(e.target.matches('#menu-combos')){
        // Toggle estado activo de los btn
        $menuCombos.classList.add('menu-active');
        $menuPiezas.classList.remove('menu-active');
        // Borra elementos ya impresos
        $($menuCards).empty();
        // Imprime cards de menuCombos
        imprimirCards(menuCombos);
    }

    agregarEventosBtnCards();
}); */


// Por defecto, el menú de piezas va a estar seleccionado
// Cuando se carga la página, se cargan automáticamente las cards de menuPiezas
window.addEventListener('load', (e)=>{
    imprimirCards(menuPiezas);
    agregarEventosBtnCards();
});


// Buscar la info de producto en productos[] con el id de la card
const buscarObjetoPorId = (id) => {
    let objeto = productos.find(producto => producto.id === id);
    return objeto;
}

const agregarProductoAPedido = (copiaObjetoProducto) => {
    let $itemPedido = '';
    // El primer objeto que ingresa al pedidoArray[] se agrega directamente
    if(pedidoArray.length === 0){
        // Crear contador para llevar registro de la cantidad
        // de productos de este tipo que se agregan a pedidoArray[]
        copiaObjetoProducto.contadorProductoEnPedido = 1;
        pedidoArray.push(copiaObjetoProducto);
        // Crea item para imprimir en el HTML del detalle de pedido
        $itemPedido = crearHTMLItemPedido(copiaObjetoProducto);
        agregarProductoADetallePedido();
        return activarIndicadorCart();
    }

    // Esta variable sirve para verificar si el producto
    // de copiaObjetoProducto ya existe dentro de pedidoArray[]
    let productoDentroPedido = false;

    // A partir del segundo objeto, buscar si el id de 
    // copiaObjetoPedido existe en pedidoArray[]
    if(pedidoArray.length >= 1){
        // Ver si hay un objeto con el mismo id en pedidoArray[]
        for(producto of pedidoArray){
            if(producto.id === copiaObjetoProducto.id) productoDentroPedido = true;
        }
        // Si el id ya existe, actualizar el contadorProductoEnPedido
        if(productoDentroPedido){
            producto.contadorProductoEnPedido++;
            agregarProductoADetallePedido();
            $itemPedido = crearHTMLItemPedido(copiaObjetoProducto);
            return activarIndicadorCart();
        } else{
            // Si el id no existe, agregar el objeto y actualizar contador a 1
            copiaObjetoProducto.contadorProductoEnPedido = 1;
            pedidoArray.push(copiaObjetoProducto);
            agregarProductoADetallePedido();
            $itemPedido = crearHTMLItemPedido(copiaObjetoProducto);
            return activarIndicadorCart();
        } 
    } 
}

// Crear elemento HTML del item de pedido
const crearHTMLItemPedido = (copiaObjetoProducto) => {
    // Crea elemento HTML
    let $pedidoDetalle = document.createElement('p');
    let detalle = '';
    let itemPedidoEnArray;

    for(producto of pedidoArray){
        if(copiaObjetoProducto.id === producto.id){
            // Se guarda el objeto en la variable para poder usar su info
            // para imprimir el HTML
            itemPedidoEnArray = producto;
        } 
    }

    // Genera contenido del HTML en base al producto
    detalle = `${itemPedidoEnArray.contadorProductoEnPedido} ${itemPedidoEnArray.nombre}: $${itemPedidoEnArray.precio}`;
    $pedidoDetalle.innerHTML = detalle;
    return $pedidoDetalle;
}

// Activar indicador cart para que muestre cantidad productos agregardos a carrito
const activarIndicadorCart = () =>{
    if(pedidoArray.length > 0){
        $cartIndicador.classList.remove('d-none');
        $cartIndicador.innerHTML = actualizarValorCart();
        // Actualiza atributo href de carrito para que lleve a Mi Pedido
        actualizarRutaEnlaceCart();
    } else if (pedidoArray.length <= 0){
        $cartIndicador.classList.add('d-none');
        // Actualiza atributo href de carrito para que lleve a Menu
        actualizarRutaEnlaceCart();
    }
};

// Recorre pedidoArray[] y suma los contadores de todos los productos
const actualizarValorCart = () =>{
    let contador = 0;
    for(producto of pedidoArray){
        contador += producto.contadorProductoEnPedido;
    }
    return contador;
}

// Revisa si pedidoArray[], si tiene items actualiza href a Pedido
// Si no tiene items, mantiene href a Menu
const actualizarRutaEnlaceCart = () =>{
    $cart.setAttribute('href', '#anchor_menu');
    if(pedidoArray.length > 0){
        $cart.setAttribute('href', '#anchor_pedido');
    } else if (pedidoArray.length <= 0) {
        $cart.setAttribute('href', '#anchor_menu');
    }
}

// Calcular total pedido
const calcularTotalPedido = (array) =>{
    totalPedido = 0;
    for(item of array){
        totalPedido += (item.precio * item.contadorProductoEnPedido);
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
        cantidadPiezas += (item.piezas * item.contadorProductoEnPedido);
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

    // Ocultar section pedidos si se eliminan todos los items del pedido
    if(pedidoArray.length <= 0){
        $pedido.classList.add('d-none');
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
const agregarProductoADetallePedido = () =>{
    $('#pedido-items').empty();
    // En vez de recibir cada producto e ir agregándolo de a uno, 
    // lo que puedo hacer es que cada vez que se agregue un producto, 
    // se recorra pedidoArray y se impriman los elementos HTML desde el array
    // en vez de enviarlos como parámetros
    for(producto of pedidoArray){
        // Crea contenedor para el item de pedido
        let $pedidoItem = document.createElement('div');
        $pedidoItem.classList.add('pedido__item');
        // Crea icono para el item de pedido
        let $pedidoIcon = document.createElement('i');
        $pedidoIcon.classList.add('far');
        $pedidoIcon.classList.add('fa-trash-alt');
        // Agregar producto id como clase a $pedidoIcon para poder después
        // recuperar el id en eliminarProductoDePedido 
        $pedidoIcon.classList.add(`${producto.id}`);

        // Agregar icono a $pedidoItem
        $pedidoItem.appendChild($pedidoIcon);

        // Crea detalle del pedido
        let detalle = `${producto.contadorProductoEnPedido} ${producto.nombre}: $${producto.precio}`;
        let $pedidoDetalle = document.createElement('p');
        $pedidoDetalle.innerHTML = detalle;
        // Agrega detalle pedido a $pedidoItem
        $pedidoItem.appendChild($pedidoDetalle);

        // Agrega $pedidoItems al listado completo de pedido
        $pedidoItems.appendChild($pedidoItem);

        // Agrega eventListener al $pedidoIcon para eliminar items
        $pedidoIcon.onclick = () => {
            // Recibe una lista con las clases del icono de pedido
            let arrayClasesIcon = Array.from($pedidoIcon.classList);
            let pedidoIconId = '';
            // Busco el id de producto en el listado de clases de pedido icon
            for(clase of arrayClasesIcon){
                if(clase !== 'far' && clase !== 'fa-trash-alt'){
                    pedidoIconId = clase;
                }
            }
            eliminarProductoDePedido(pedidoIconId);
        }
    }
    // Actualiza estado pedido cada vez que se imprime nuevo HTML
    mostrarEstadoPedido();
}

// Elimina producto de pedidoArray
const eliminarProductoDePedido = (id) => {
    // Actualiza el contador del objeto
    for(producto of pedidoArray){
        // Si la cantidad de items es al menos 1, se disminuye el contador
        if(id === producto.id && producto.contadorProductoEnPedido >= 1){
            console.log('coincidencia id');
            producto.contadorProductoEnPedido--;
        }
        // Si la cantidad de items es 0, se borra el producto de pedidoArray
        if(id === producto.id && producto.contadorProductoEnPedido < 1){
            console.log(pedidoArray);
            for(producto of pedidoArray) {
                if(producto.id === id) {
                    let posicionEnArray = pedidoArray.indexOf(producto);
                    pedidoArray.splice(posicionEnArray, 1);
                }
            }
        }
    }
    // Vuelve a imprimir HTML del pedido
    agregarProductoADetallePedido();
    // Actualiza estado de pedido
    mostrarEstadoPedido();
    // Actualiza cantidad de productos en el indicador cart
    activarIndicadorCart();
}

// Animación entre secciones del sitio
$('#navbar-anchor').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#navbar').offset().top
    }, 1500);
});

$('#navbar-footer').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#footer').offset().top
    }, 1500);
});

$('#navbar-menu').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#anchor_menu').offset().top
    }, 1500);
});

$('#btn-main').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#anchor_menu').offset().top
    }, 1500);
});
