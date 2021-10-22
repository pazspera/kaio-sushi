const URL_JSON = "json/productos.json";

/* // Guardar array con todos los productos en localStorage
let productosJSON = JSON.stringify(productos)
localStorage.setItem('productos', productosJSON);

const menuPiezas = [];
const menuCombos = [];

// Recupera todos los valores de productos desde el localStorage
let menuProductos = JSON.parse(localStorage.getItem('productos'));

// Divide los productos en dos arrays: combos y piezas
for(producto of menuProductos){
    if(producto.tipo === 'combo') menuCombos.push(producto);
    if(producto.tipo === 'piezas') menuPiezas.push(producto);
} */


const menuPiezas = [];
const menuCombos = [];

let $cardsMenu;
let $menuPiezas = document.getElementById('menu-piezas');
let $menuCombos = document.getElementById('menu-combos');
let $menuOpciones = document.getElementById('menu-opciones');

// A esta variable le agrego todos los productos que
// vienen del JSON una vez que la petición funcione
// Es importante que esta variable tenga el array
// con todos los productos para que funcione el carrito
let productos;

// Recuperar los productos desde productos.json
$(document).ready( () => {
    $.get(URL_JSON, function(respuesta, estado){
        console.log(respuesta);
        console.log(estado);
        if(estado === 'success'){
            productos = respuesta;
            // Divide los productos en dos arrays: combos y piezas
            for(producto of productos){
                if(producto.tipo === 'combo') menuCombos.push(producto);
                if(producto.tipo === 'piezas') menuPiezas.push(producto);
            }
            imprimirCards(menuPiezas);
            agregarEventosBtnCards();
            console.log(menuPiezas);
            console.log(menuCombos);
        }
    })
});

// Imprimir cards de producto en #menu-cards
// Función con jQuery
/* const imprimirCards = (array) => {
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
} */
// Función con Vanilla JS
const imprimirCards = (array) => { 
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
}


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
/* $('#menu-opciones').on('click', (e) => {
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
}) */

// Función con Vanilla JS
$menuOpciones.addEventListener('click', (e) =>{
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
});


// Por defecto, el menú de piezas va a estar seleccionado
// Cuando se carga la página, se cargan automáticamente las cards de menuPiezas
/* window.addEventListener('load', (e)=>{
    imprimirCards(menuPiezas);
    agregarEventosBtnCards();
}); */
