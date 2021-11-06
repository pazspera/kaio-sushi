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

let formularioCompleto = false;

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
    for(prop in estadoPedido){
        let $p = document.createElement('p');
        $p.innerHTML = `${estadoPedido[prop]}`;
        $fragmentoEstadoPedido.appendChild($p);
    };
    $listadoPedido.appendChild($fragmentoEstadoPedido);
}


/* 
    - En submit, quiero que se verifique que cada campo del formulario esté correcto
    - Si todos los campos están correctos, una variable que lleva registro si el formulario está completo o no cambia a true
    - Puede ser una función con js que se llame a desde el btnSubmit on click

    Validaciones:

    Nombre: solo letras y espacios en blanco
    Direccion: letras, espacios en blanco y números
    Telefono: solo números
    Tarjeta: solo números
    Nombre titular: solo letras y espacios en blanco
    Hasta: solo números, maxlength 4
    CVC: solo números, maxlength 3

    Toda la validación es en submit, antes de que esté ok, hacer que el btnSubmit no pueda enviar
    Funciones individuales para cada campo para validarlo con una regexp diferente
    Que muestre los cartelitos de error cuando 
*/

const verificarInput = (input) => {
    let pattern = String(input.pattern);
    console.log(pattern);
    let regex = new RegExp(pattern);
    console.log(regex);
    /* let inputId = `form-${input.id}`;
    console.log(regex);
    if(!regex.exec(input.value) || input.value === ''){
        console.log(input.value);
        document.getElementById(inputId).classList.remove('d-none'); 
    } */
}

const $inputs = Array.from(document.querySelectorAll('.form-control'));
console.log($inputs);

$inputs.forEach(input => {
    const $span = document.createElement('span');
    $span.id = `form-${input.name}`;
    $span.textContent = input.title;
    $span.classList.add('formulario-error', 'd-none');
    input.insertAdjacentElement('afterend', $span);
})

$('#btnSubmit').on('click', (e) => {
    // Impide que mande formulario
    e.preventDefault();
    // Esta variable impide que se mande el formulario hasta
    // que se haya chequeado que todos los inputs estén completos
    let formularioCompleto = false;
    // Agregar validación de formulario: que todos los required inputs estén llenos

    $inputs.forEach(input => {
        console.log(input);
        verificarInput(input);
    })


    // TODO ESTE CÓDIGO VA EN UN IF 
    // que se activa en caso de que todos los inputs required estén llenos
    // Puede haber una variable que venga por default y verifique que todos los
    // input tengan valid
    // Va al top de la página

    if(formularioCompleto) {
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
                $('#confirmacionResultado').html(`<p>¡Gracias por tu compra, ${nombre}!</p>`);
            },
            complete: function() {
                // Oculta spinner
                $('#loading').toggleClass('d-none');
            }
        })
    }
    
    // Al terminar la compra, el pedido de local storage se cambia a null,
    // borrando el pedido anterior
    // Definir un array vacío tiraba error con el JSON, null funciona bien
    /* let array = null;
    localStorage.setItem('pedido', JSON.parse(array));
    localStorage.setItem('estadoPedido', JSON.parse(array)); */
})


// Función con jquery simple
/* $('#btnSubmit').on('click', (e) => {
    // Impide que mande formulario
    e.preventDefault();
    
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
                $('#confirmacionResultado').html(`<p>¡Gracias por tu compra, ${nombre}!</p>`);
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
}) */



// Impide que el btn-submit recargue la página
/* $btnSubmit.addEventListener('click', (e) =>{
    e.preventDefault();
    // Va a top de la página
    // $(spinner).scrollTop();
    //window.scrollTo(0,0);
    scrollToTop();
    let $spinner = document.getElementById('loading');
    let $pedidoForm = document.getElementById('pedido-form');
    // Hace spinner visible
    $spinner.classList.toggle('d-none');
    // Oculta formulario
    $pedidoForm.classList.toggle('d-none');
});
 */

