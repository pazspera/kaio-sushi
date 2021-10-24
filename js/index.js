/* 
    AGREGAR EL MENÚ CON MI PEDIDO 

    Al tocar el ícono de cart, desde la derecha aparece
    un panel con el resultado de pedidoArray. 
    Usar Offcanvas de Bootstrap para esto

    INCORPORAR AJAX


    DIVIDIR ARCHIVO MAIN.JS EN VARIOS ARCHIVOS


    AGREGAR FORMULARIO PARA PAGAR 


    AGREGAR HTML CON CONFIRMACION DE PEDIDO
    
    1. Mover icono de + a flex end
    2. Funcionalidad de icono +
    3. Agregar preventDefault al btn de envío de pago
*/


// --------- VARIABLES ---------
const COSTO_ENVIO = 150;
let pedidoArray = [];
// pedidoId va a generar un id a cada pedido que se agregue a pedidoArray
let pedidoId = 0;
let totalPedido = 0;
let totalAPagar = 0;
let estadoCostoEnvio;
let tiempoPreparacion;
const estadoPedido = {
    totalPedido: '',
    estadoCostoEnvio: '',
    totalAPagar: '',
    tiempoPreparacion: '',
};

// Variables elementos HTML
let $menuCards = document.getElementById('menu-cards');
let $pedido = document.getElementById('pedido');
let $pedidoItems = document.getElementById('pedido-items');
let $pedidoEstado = document.getElementById('pedido-estado');
let $totalPedido = document.createElement('p');
let $costoEnvio = document.createElement('p');
let $totalAPagar = document.createElement('p');
let $tiempoPreparacion = document.createElement('p');

let $cartIndicador = document.querySelector('.cart__indicador');
let $cart = document.querySelector('.cart__icon');

let $btnComprar = document.getElementById('btn-comprar');

let $fragmentoPedidoItems = document.createDocumentFragment();
let $fragmentoPedidoEstado = document.createDocumentFragment();

// --------- FUNCIONES ---------


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
    detalle = `${itemPedidoEnArray.contadorProductoEnPedido} ${itemPedidoEnArray.nombre}: $${formatoCurrency(itemPedidoEnArray.precio)}`;
    $pedidoDetalle.innerHTML = detalle;
    return $pedidoDetalle;
}

// Activar indicador cart para que muestre cantidad productos agregardos a carrito
const activarIndicadorCart = () =>{
    if(pedidoArray.length > 0){
        $cartIndicador.classList.remove('d-none');
        $cartIndicador.innerHTML = actualizarValorCart();
    } else if (pedidoArray.length <= 0){
        $cartIndicador.classList.add('d-none');
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

    totalPedido = calcularTotalPedido(pedidoArray);
    $totalPedido.innerHTML = `Total pedido: $${formatoCurrency(totalPedido)}`;
    $fragmentoPedidoEstado.appendChild($totalPedido);

    calcularCostoEnvio(totalPedido);
    $costoEnvio.innerHTML = `${estadoCostoEnvio}`;
    $fragmentoPedidoEstado.appendChild($costoEnvio);

    $totalAPagar.innerHTML = `Total a pagar: $${formatoCurrency(totalAPagar)}`;
    $fragmentoPedidoEstado.appendChild($totalAPagar);

    tiempoPreparacion = calcularTiempoPreparacionPedido(pedidoArray);
    if(pedidoArray.length > 0){
        $tiempoPreparacion.innerHTML = `Tiempo estimado de preparación: ${tiempoPreparacion}`;
        $fragmentoPedidoEstado.appendChild($tiempoPreparacion);
    } 

    // Actualizar valores del objeto estadoPedido para después
    // guardarlo en local storage y usar esa info en compra.html
    estadoPedido.totalPedido = `Total pedido: $${formatoCurrency(totalPedido)}`;
    estadoPedido.estadoCostoEnvio = estadoCostoEnvio;
    estadoPedido.totalAPagar = `Total a pagar: $${formatoCurrency(totalAPagar)}`;
    estadoPedido.tiempoPreparacion = `Tiempo de preparación: ${tiempoPreparacion}`;
    console.log(estadoPedido);

    $pedidoEstado.appendChild($fragmentoPedidoEstado);
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
        // Crea icono para eliminarItem de pedido
        let $pedidoIconDelete = document.createElement('i');
        $pedidoIconDelete.classList.add('far');
        $pedidoIconDelete.classList.add('fa-trash-alt');
        // Agregar producto id como clase a $pedidoIconDelete para poder después
        // recuperar el id en eliminarProductoDePedido 
        $pedidoIconDelete.classList.add(`${producto.id}`);

        // Agregar icono a $pedidoItem
        $pedidoItem.appendChild($pedidoIconDelete);

        // Crea detalle del pedido
        let detalle = `${producto.contadorProductoEnPedido} ${producto.nombre}: $${formatoCurrency(producto.precio*producto.contadorProductoEnPedido)}`;
        let $pedidoDetalle = document.createElement('p');
        $pedidoDetalle.innerHTML = detalle;
        // Agrega detalle pedido a $pedidoItem
        $pedidoItem.appendChild($pedidoDetalle);

        // Crea icono para agregarItem de pedido
        let $pedidoIconAdd = document.createElement('i');
        $pedidoIconAdd.classList.add('far');
        $pedidoIconAdd.classList.add('fa-plus-square');
        $pedidoIconAdd.classList.add('ms-auto');
        $pedidoIconAdd.classList.add(`${producto.id}`);
        $pedidoItem.appendChild($pedidoIconAdd);

        // Agrega $pedidoItems al fragmento de pedidoItems
        $fragmentoPedidoItems.appendChild($pedidoItem);

        // Agrega eventListener al $pedidoIconDelete para eliminar items
        $pedidoIconDelete.onclick = () => {
            // Recibe una lista con las clases del icono de pedido
            let arrayClasesIconDelete = Array.from($pedidoIconDelete.classList);
            let pedidoIconDeleteId = '';
            // Busco el id de producto en el listado de clases de pedido icon
            for(clase of arrayClasesIconDelete){
                if(clase !== 'far' && clase !== 'fa-trash-alt'){
                    pedidoIconDeleteId = clase;
                }
            }
            eliminarProductoDePedido(pedidoIconDeleteId);
        }

        // Agregar eventListener a $pedidoIconAdd para agregar items
        // al pedido desde offcanvas
        $pedidoIconAdd.onclick = () => {
            let arrayClasesIconAdd = Array.from($pedidoIconAdd.classList);
            let pedidoIconAddId = '';
            // Busco el id de producto en el listado de clases de pedido icon
            for(clase of arrayClasesIconAdd){
                if(clase !== 'far' && clase !== 'fa-plus-square' && clase != 'ms-auto'){
                    pedidoIconAddId = clase;
                }
            }
            agregarProductoDesdeMenu(pedidoIconAddId);
        }
    }

    // Append del fragmento a $pedidoItems
    $pedidoItems.append($fragmentoPedidoItems);
    // Actualiza estado pedido cada vez que se imprime nuevo HTML
    mostrarEstadoPedido();
}

// Elimina producto de pedidoArray
const eliminarProductoDePedido = (id) => {
    console.log(id);
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

// Agrega producto desde el offcanvas de pedido
const agregarProductoDesdeMenu = (id) => {
    // Actualiza el contador del objeto
    for(producto of pedidoArray){
        // Si la cantidad de items es al menos 1, se disminuye el contador
        if(id === producto.id && producto.contadorProductoEnPedido >= 1){
            console.log('coincidencia id');
            producto.contadorProductoEnPedido++;
        }
    }
    // Vuelve a imprimir HTML del pedido
    agregarProductoADetallePedido();
    // Actualiza estado de pedido
    mostrarEstadoPedido();
    // Actualiza cantidad de productos en el indicador cart
    activarIndicadorCart();
}

// Al hacer click en #btn-comprar, guardar una copia de pedidoArray en local storage
$btnComprar.addEventListener('click', (e) => {
    console.log(pedidoArray);
    // Convierte pedidoArray a JSON
    let pedidoJSON = JSON.stringify(pedidoArray);
    console.log(pedidoJSON);
    // Guarda pedidoJSON en local storage para poder recuperarlo en compra.html
    localStorage.setItem('pedido', pedidoJSON);
    // Convierte estadoPedido en JSON
    // Se usa para mostrar el estado de pedido actualizado en compra.html
    let estadoPedidoJSON = JSON.stringify(estadoPedido);
    localStorage.setItem('estadoPedido', estadoPedidoJSON);
})

