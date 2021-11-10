
// --------- VARIABLES ---------

let $fragmentoPedidoCompra = document.createDocumentFragment();
let $fragmentoEstadoPedido = document.createDocumentFragment();
let $listadoPedido = '';
let $btnSubmit = document.getElementById('btn-submit');

const URL_POST = 'https://jsonplaceholder.typicode.com/posts';


// --------- FUNCIONES ---------

// Al cargar el documento, recupera el pedido guardado en el local storage
// y lo muestra en la sección
window.addEventListener('load', (e) => {
    imprimirPedido();
    imprimirEstadoPedido();
})

const imprimirPedido = () => {
    let pedido = JSON.parse(localStorage.getItem('pedido'));

    $listadoPedido = document.getElementById('listadoPedido');
    for(producto of pedido){
        let $item = document.createElement('p');
        let detalle = `${producto.contadorProductoEnPedido} ${producto.nombre}: $${formatoCurrency(producto.precio * producto.contadorProductoEnPedido)}`;
        $item.innerHTML = detalle;
        $fragmentoPedidoCompra.appendChild($item);
    }
    $listadoPedido.appendChild($fragmentoPedidoCompra);
}

const imprimirEstadoPedido = () => {
    let estadoPedido = JSON.parse(localStorage.getItem('estadoPedido'));
    let $separador = document.createElement('hr');
    $fragmentoEstadoPedido.appendChild($separador);

    for(prop in estadoPedido){
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
            <p>Cualquier consulta nos podés contactar telefónicamente al (11) 4855-3212 o por correo <a href="#">hola@kaio-sushi.com.ar</a></p>
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
