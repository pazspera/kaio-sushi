/* 
    DESAFIO 09: Incorporar Eventos

    - Una vez que carga el documento, guardamos los btn__card-pedido en $cardsBtn
    - A cada elemento de $cardsBtn le quiero asignar un evento on click que imprima por consola la info de la card a la que pertenece

    - Al cargar el documento, recuperamos las cards que se generan con JS en $cardsMenu (nodelist) y las pasamos a $cardsMenuArray (array)
    - Cada card va a tener el id que es el id del objeto Producto correspondiente a esa card. Este id permite acceder a las propiedades del objeto que representa la card y así poder imprimirlo en el resumen del pedido

    AGREGAR CONTADOR DE PEDIDOS A CADA PRESS DE BTN QUE SAQUÉ LA FUNCIÓN QUE ESTABA EN LA CLASE
*/



// --------- VARIABLES ---------

let menu = '';
const COSTO_ENVIO = 150;
let pedidoArray = [];
let pedido;
let totalPedido = 0;
let totalAPagar = 0;
let totalProductosPedidos = 0;
// estadoCostoEnvio inicializado a 0 para que no muestre undefined si el usuario no ingresa productos
let estadoCostoEnvio = 'Costo de envío: $0';
let detallePedido = 'Detalle del pedido:\n';
let tiempoPreparacionPedido = 'Tiempo estimado de preparación del pedido: ';

// Variables elementos HTML
let $menuCards = document.getElementById('menu-cards');
let $pedido = document.getElementById('pedido');
let $pedidoItems = document.getElementById('pedido-items');
let $pedidoEstado = document.getElementById('pedido-estado');
let $totalPedido = document.createElement('p');
let $costoEnvio = document.createElement('p');
let $totalAPagar = document.createElement('p');
let $tiempoPreparacion = document.createElement('p');



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

// Ingresar pedido
const ingresarPedido = () => {
    // Pedirle al usuario que ingrese código de producto, ingresa 0 para terminar pedido
    do{
        pedido = parseInt(prompt(`Ingresa el código de producto que quieras agregar a tu pedido.\nIngresando 0 terminas tu pedido.\n${menu}`));
        // Operaciones en base al código de producto
        buscarDatosProducto(pedido);
        // Imprime en consola el pedido hasta el momento
        mostrarEstadoPedido();
    } while(pedido !== 0);
};

// Buscar datos de producto
// Dentro de cada case se llaman a las funciones secundarias
const buscarDatosProducto2 = (numProducto) => {
    switch (numProducto){
        case 1:
            agregarImporteATotalPedido(rollNuevaYork.precio);
            agregarProductoADetallePedido(`1 ${rollNuevaYork.nombre}: $${rollNuevaYork.precio}\n`);
            calcularCostoEnvio(totalPedido);
            rollNuevaYork.contarProductosPedidos();
            break;
        case 2: 
            agregarImporteATotalPedido(rollAtun.precio);
            agregarProductoADetallePedido(`1 ${rollAtun.nombre}: $${rollAtun.precio}\n`);
            calcularCostoEnvio(totalPedido);
            rollAtun.contarProductosPedidos();
            break;
        case 3: 
            agregarImporteATotalPedido(rollSalmonDoble.precio);
            agregarProductoADetallePedido(`1 ${rollSalmonDoble.nombre}: $${rollSalmonDoble.precio}\n`);
            calcularCostoEnvio(totalPedido);
            rollSalmonDoble.contarProductosPedidos();
            break;            
        case 4: 
            agregarImporteATotalPedido(sashimi.precio);
            agregarProductoADetallePedido(`1 ${sashimi.nombre}: $${sashimi.precio}\n`);
            calcularCostoEnvio(totalPedido);
            sashimi.contarProductosPedidos();
            break;
        case 5: 
            agregarImporteATotalPedido(promo30Piezas.precio);
            agregarProductoADetallePedido(`1 ${promo30Piezas.nombre}: $${promo30Piezas.precio}\n`);
            calcularCostoEnvio(totalPedido);
            promo30Piezas.contarProductosPedidos();
            break;
        case 0:
            calcularTiempoPreparacionPedido(totalProductosPedidos);
            break;
        default: 
            console.log('Código de producto inválido');
    }
};

// Calcular total
// Sumarle ese importe a totalPedido 
const agregarImporteATotalPedido = (num) => {
    totalPedido += num;
};

// Detalle pedido
// Agregar el nombre de producto a detalle pedido
const agregarProductoADetallePedido = (descripcion) => {
    detallePedido += descripcion;
    let $pedidoItem = document.createElement('li');
    $pedidoItem.innerHTML = descripcion;
    $pedidoItems.appendChild($pedidoItem);
};

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
const calcularTiempoPreparacionPedido = (cantPedidos) => {
    if(cantPedidos > 0 && cantPedidos <= 3) {
        tiempoPreparacionPedido += '15 minutos';
    } else if(cantPedidos > 3 && cantPedidos <=6) {
        tiempoPreparacionPedido += '15 a 30 minutos';
    } else if(cantPedidos > 6 && cantPedidos <= 10){
        tiempoPreparacionPedido += '30 a 45 minutos';
    } else if(cantPedidos > 10 && cantPedidos <=15){
        tiempoPreparacionPedido += '45 a 60 minutos';
    } else if(cantPedidos > 15 && cantPedidos <=20){
        tiempoPreparacionPedido += '60 a 75 minutos';
    } else if(cantPedidos > 20){
        tiempoPreparacionPedido += '90 minutos';
    }
}

// Mostrar estado del pedido
const mostrarEstadoPedido = () => {
    // Hacer visible section pedidos cuando haya al menos un pedido añadido
    if(pedidoArray.length > 0){
        $pedido.classList.remove('d-none');
    }

    $totalPedido.innerHTML = `Total pedido: $${totalPedido}`;
    $pedidoEstado.appendChild($totalPedido);

    $costoEnvio.innerHTML = `${estadoCostoEnvio}`;
    $pedidoEstado.appendChild($costoEnvio);

    $totalAPagar.innerHTML = `Total a pagar: $${totalAPagar}`;
    $pedidoEstado.appendChild($totalAPagar);

    
    if(pedido === 0 && totalProductosPedidos > 0){
        $tiempoPreparacion.innerHTML = `${tiempoPreparacionPedido}`;
        $pedidoEstado.appendChild($tiempoPreparacion);
    } 
}

// Recuperar info de la card al hacer click en el btn

let $cardsMenu;
// Una vez que carga el documento, se obtienen las cards en $cardMenu
// para poder asignarles eventos
window.addEventListener('load', (e)=>{
    console.log('ejecuta funcion');
    $cardsMenu = document.querySelectorAll('.card');
    // Agrega eventListener a cada card
    $cardsMenu.forEach(card => {
        card.addEventListener('click', (e) =>{
            // Hace que el eventListener se active solo al clickear el btn de agregar pedido
            if(e.target.matches('.btn__card-pedido')){
                console.log(card);
                console.log(card.id);
                buscarDatosProducto(card.id);
                mostrarEstadoPedido();
            }
        })
    });
});

// Buscar la info de producto en productos[] con el id de la card
const buscarDatosProducto = (id) =>{
    let producto = productos.find(producto => producto.id === id);
    console.log(producto);
    // Agregar producto elegido a pedidoArray
    pedidoArray.push(producto);
    console.log(pedidoArray);
};






// Llamar función principal
// ingresarPedido();
