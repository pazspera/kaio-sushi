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

    SPINNER AJAX

    - Buscar una librería con spinner y agregarla a compra.html hidden
    - Cuando se hace click en btn-submit, hacer petición ajax sacarle el hidden al spinner y borrar todo el contenido del pedido
    - La página de prueba usaba una petición a la dummy API pero no usaba ninguno de los datos devueltos, capaz puedo implementar eso también
    - El texto de confirmación dice que por mensaje de texto le van a avisar cuando salga el pedido y que tenga un btn para volver al inicio
*/


let $fragmentoPedidoCompra = document.createDocumentFragment();
let $fragmentoEstadoPedido = document.createDocumentFragment();
let $listadoPedido = '';
let $btnSubmit = document.getElementById('btn-submit');

const URL_POST = 'https://jsonplaceholder.typicode.com/posts';

// Al cargar el documento, recupera el pedido guardado en el local storage
// y lo muestra en la sección
window.addEventListener('load', (e) => {
    imprimirPedido();
    imprimirEstadoPedido();
})

const imprimirPedido = () => {
    let pedido = JSON.parse(localStorage.getItem('pedido'));

    $listadoPedido = document.getElementById('listadoPedido');
    console.log(pedido);
    for(producto of pedido){
        let $item = document.createElement('p');
        let detalle = `${producto.contadorProductoEnPedido} ${producto.nombre}: $${formatoCurrency(producto.precio * producto.contadorProductoEnPedido)}`;
        console.log(detalle);
        $item.innerHTML = detalle;
        $fragmentoPedidoCompra.appendChild($item);
    }
    $listadoPedido.appendChild($fragmentoPedidoCompra);
}

const imprimirEstadoPedido = () => {
    let estadoPedido = JSON.parse(localStorage.getItem('estadoPedido'));
    let $separador = document.createElement('hr');
    $fragmentoEstadoPedido.appendChild($separador);

    console.log(estadoPedido);
    for(prop in estadoPedido){
        console.log(`${prop}: ${estadoPedido[prop]}`);
        let $p = document.createElement('p');
        $p.innerHTML = `${estadoPedido[prop]}`;
        $fragmentoEstadoPedido.appendChild($p);
    };
    $listadoPedido.appendChild($fragmentoEstadoPedido);
}


// Petición ajax de envío de formulario
$('#formulario').submit((e) => {
    // Impide que mande formulario
    e.preventDefault();
    // Va al top de la página
     $('html, body').animate({ scrollTop: 0 }, '10');
    
    let nombre = $('#nombre').val();

    $.ajax({
        url: URL_POST,
        type: 'POST',
        data: {
            nombre: nombre,
        },
        beforeSend: function() {
            // Oculta formulario
            $('#pedido-form').toggleClass('d-none');
            // Carga spinner
            $('#loading').toggleClass('d-none');
        },
        success: function(data){
            // Hace visible section confirmación
            $('#confirmacion').toggleClass('d-none');
            $('#confirmacionResultado').html(`<i class="far fa-check-circle confirmacion__icono"></i>
            <h2 class="confirmacion__titulo">¡Gracias por tu compra, ${nombre}!</h2>
            <div class="confirmacion__texto">
            <p>Te enviaremos un email cuando tu pedido esté en camino.</p>
            <p>Cualquier consulta nos podés contactar telefónicamente al 113490-3212 o por correo en <a href="#">hola@kaio-sushi.com.ar</a></p>
            </div>`);
        },
        complete: function() {
            // Oculta spinner
            $('#loading').toggleClass('d-none');
        }
    }) 

    // Al terminar la compra, el pedido de local storage se cambia a null,
    // borrando el pedido anterior
    // Definir un array vacío tiraba error con el JSON, null funciona bien
    let array = null;
    localStorage.setItem('pedido', JSON.parse(array));
    localStorage.setItem('estadoPedido', JSON.parse(array));
})



/* $('#btnSubmit').on('submit', (e) => {
    // Impide que mande formulario
    e.preventDefault();
    // Va al top de la página
     $('html, body').animate({ scrollTop: 0 }, '10');
    
    let nombre = $('#nombre').val();

    $.ajax({
        url: URL_POST,
        type: 'POST',
        data: {
            nombre: nombre,
        },
        beforeSend: function() {
            // Oculta formulario
            $('#pedido-form').toggleClass('d-none');
            // Carga spinner
            $('#loading').toggleClass('d-none');
        },
        success: function(data){
            // Hace visible section confirmación
            $('#confirmacion').toggleClass('d-none');
            $('#confirmacionResultado').html(`<i class="far fa-check-circle confirmacion__icono"></i>
            <h2 class="confirmacion__titulo">¡Gracias por tu compra, ${nombre}!</h2>
            <div class="confirmacion__texto">
            <p>Te enviaremos un mensaje cuando tu pedido salga de nuestra sucursal.</p>
            <p>Cualquier consulta nos podés contactar telefónicamente al 113490-3212 o por correo en <a href="#">hola@kaio-sushi.com.ar</a></p>
            </div>`);
        },
        complete: function() {
            // Oculta spinner
            $('#loading').toggleClass('d-none');
        }
    }) 

    // Al terminar la compra, el pedido de local storage se cambia a null,
    // borrando el pedido anterior
    // Definir un array vacío tiraba error con el JSON, null funciona bien
    let array = null;
    localStorage.setItem('pedido', JSON.parse(array));
    localStorage.setItem('estadoPedido', JSON.parse(array));
})

 */