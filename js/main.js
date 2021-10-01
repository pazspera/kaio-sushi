// CLASES
class Producto {
    constructor(id, nombre, precio, piezas, descripcion){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.piezas = piezas;
        this.descripcion = descripcion;
    }
    contarProductosPedidos(){
        totalProductosPedidos++;
    }
}

// VARIABLES
const rollNuevaYork = new Producto('roll_new_york', 'Nueva York', 350, 5, 'Salmón rosado, queso Philadelphia y palta.') ;
const rollAtun = new Producto('roll_atun', 'Atún', 250, 5, 'Atún, queso Philadelphia y palta.');
const rollSalmonDoble = new Producto('roll_salmon_doble', 'Salmón doble', 450, 5, 'Relleno de salmón y palta con cobertura de salmón.');
const sashimi = new Producto('sashimi', 'Sashimi', 450, 5, 'Lonjas de salmón rosado.');
const promo30Piezas = new Producto('promo_20_piezas', 'Promo 20 piezas', 2100, 20, '5 rolls Nueva York, 5 rolls de atún, 5 rolls de salmón doble y 5 sashimi.');

const productos = [rollNuevaYork, rollAtun, rollSalmonDoble, sashimi, promo30Piezas];
let menu = '';

const COSTO_ENVIO = 150;

let pedido;
let totalPedido = 0;
let totalAPagar = 0;
let totalProductosPedidos = 0;
// estadoCostoEnvio inicializado a 0 para que no muestre undefined si el usuario no ingresa productos
let estadoCostoEnvio = 'Costo de envío: $0';
let detallePedido = 'Detalle del pedido:\n';
let tiempoPreparacionPedido = 'Tiempo estimado de preparación del pedido: ';

let $menuCards = document.getElementById('menu-cards');

// FUNCIONES
// Imprimir productos en menu para colocar en el prompt
for(let producto of productos){
    menu += `${producto.id}: ${producto.nombre} $${producto.precio}`;
    menu += '\n';
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
const buscarDatosProducto = (numProducto) => {
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
            console.log('FIN DEL PEDIDO');
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
    if(pedido === 0 && totalProductosPedidos > 0){
        // Agrega tiempoPreparacionPedido en caso que se finalice el pedido y haya al menos un producto
        // añadido al pedido
        console.log(`${detallePedido}\nTotal pedido: $${totalPedido}\n${estadoCostoEnvio}\nTotal a abonar: $${totalAPagar}\n${tiempoPreparacionPedido}`);    
    } else {
        console.log(`${detallePedido}\nTotal pedido: $${totalPedido}\n${estadoCostoEnvio}\nTotal a abonar: $${totalAPagar}`);    
    }
}

// Imprimir cards de producto en #menu-cards
for(item of productos){
    let $card = document.createElement('div');
    $card.classList.add('col');
    $card.innerHTML = `
        <div class="card h-100">
            <img src="./img/img_${item.id}.jpg" class="card-img-top" alt="${item.descripcion}">
            <div class="card-body">
            <div class="mb-2">
                <h3 class="card__title">${item.nombre}</h3>
                <p class="card__description">${item.descripcion}</p>
            </div>
            <div class="card__price mb-3">
                <p class="card__price__text">${item.piezas} piezas</p>
                <p class="card__price__amount">$${item.precio}</p>
            </div>
            <button class="btn btn__secondary">Agregar a pedido</button>
            </div>  
        </div>
    </div>`;
    $menuCards.appendChild($card);
}


// Llamar función principal
ingresarPedido();
