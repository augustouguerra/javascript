

// ECMAScript 5

// Constructor para seguro
function Seguro(marca, anio, tipoSeguro) {
    this.marca = marca;
    this.anio = anio;
    this.tipoSeguro = tipoSeguro;
}


// Example with argument
// Seguro.prototype.cotizarSeguro = informacion => {
//     console.log(informacion);
// };


// Example without argument
Seguro.prototype.cotizarSeguro = function() {

    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1': 
        cantidad = base * 1.15;
        break;

        case '2': 
        cantidad = base * 1.05;
        break;

        case '3': 
        cantidad = base * 1.35;
        break;
    }

    // Leer anio

    const diferencia = new Date().getFullYear() - this.anio;

    // Cada anio de diferencia reducimos 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    // Si el seguro es basico se multiplica por 30% mas si el seguro es complete 50% mas
    if(this.tipo === 'basico') {
        cantidad *=  1.30;
    } else {
        cantidad *=  1.50;
    }

    return cantidad;
};

// Todo lo que es la UI
function Interfaz() {
}

Interfaz.prototype.mostrarError = function (mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }

    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('form-group'));

    setTimeout(() => {
        document.querySelector('.mensaje').remove();
    }, 3000)
}

// EventListerner
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    // leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // lee el valor del anio seleccionado 
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // leer tipo seleccionado del radio button
    const tipo = document.querySelector("input[name='tipo']:checked").value;

    // Crear instancia de interfaz
    const interfaz = new Interfaz();

    // Revistar que los campos no esten vacios
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {

        interfaz.mostrarError('Faltan datos', 'error');

    } else {
        // Instanciar seguro y mostrar interfaz
        
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        
        
        // Cotizar seguro
        const cantidad = seguro.cotizarSeguro();
        
    }
});


const max = new Date().getFullYear();
min = max - 20;

const selectAnios = document.getElementById('anio');
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}