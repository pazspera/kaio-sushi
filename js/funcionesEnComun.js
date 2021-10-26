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


// Dar formato a los números
const formatoCurrency = (num) => {
    return Intl.NumberFormat('es-AR').format(num);
}


