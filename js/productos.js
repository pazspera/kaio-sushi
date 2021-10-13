const productos = [
    {
        id: 'roll_new_york',
        nombre: 'New York',
        precio: 350,
        piezas: 5,
        tipo: 'piezas',
        descripcion: 'Salmón rosado, queso Philadelphia y palta.',
    },
    {
        id: 'roll_atun',
        nombre: 'Atún',
        precio: 250,
        piezas: 5,
        tipo: 'piezas',
        descripcion: 'Atún, queso Philadelphia y palta.',
    },
    {
        id: 'roll_salmon_doble',
        nombre: 'Salmón doble',
        precio: 450,
        piezas: 5,
        tipo: 'piezas',
        descripcion: 'Relleno de salmón y palta con cobertura de salmón.',
    },
    {
        id: 'sashimi',
        nombre: 'Sashimi',
        precio: 450,
        piezas: 5,
        tipo: 'piezas',
        descripcion: 'Lonjas de salmón rosado.',
    },
    {
        id: 'promo_20_piezas',
        nombre: 'Promo 20 piezas',
        precio: 1900,
        piezas: 20,
        tipo: 'combo',
        descripcion: '5 rolls Nueva York, 5 rolls de atún, 5 rolls de salmón doble y 5 sashimi.',
    },
]

// Guardar array con todos los productos en localStorage
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
}

