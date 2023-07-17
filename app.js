// Datos de los participantes
var participantes;

// Recuperar datos de localStorage o establecer datos iniciales si no existen
if (localStorage.getItem('participantes')) {
    participantes = JSON.parse(localStorage.getItem('participantes'));
} else {
    participantes = [
        { nombre: 'Michel', puntos: 0 },
        { nombre: 'Jesus', puntos: 0 },
        { nombre: 'Abraham', puntos: 0 },
        { nombre: 'Aldo', puntos: 0 },
        { nombre: 'Manu', puntos: 0 },
        { nombre: 'Franco', puntos: 0 },
        { nombre: 'David', puntos: 0 },
        { nombre: 'JC', puntos: 0 }
    ];
}

// Función para generar la tabla
function generarTabla() {
    var tabla = document.getElementById('tabla-general');
    var tbody = tabla.querySelector('tbody');

    // Limpiar contenido anterior
    tbody.innerHTML = '';

    // Ordenar participantes por puntos (de mayor a menor)
    participantes.sort(function(a, b) {
        return b.puntos - a.puntos;
    });

    // Generar filas de la tabla
    for (var i = 0; i < participantes.length; i++) {
        var posicion = i + 1;
        var nombre = participantes[i].nombre;
        var puntos = participantes[i].puntos;

        var fila = '<tr>';
        fila += '<td>' + posicion + '</td>';
        fila += '<td>' + nombre + '</td>';
        fila += '<td>' + puntos + '</td>';
        fila += '<td><button onclick="agregarPuntos(' + i + ', \'victoria\')">Victoria</button>';
        fila += '<button onclick="agregarPuntos(' + i + ', \'empate\')">Empate</button></td>';
        fila += '<td class="text-center"><button onclick="quitarPuntos(' + i + ')">-</button></td>';
        fila += '</tr>';

        tbody.innerHTML += fila;
    }
}

// Función para agregar puntos a un participante
function agregarPuntos(index, tipo) {
    var puntos;

    if (tipo === 'victoria') {
        puntos = 2;
    } else if (tipo === 'empate') {
        puntos = 1;
    }

    if (puntos !== undefined) {
        var participante = participantes[index];
        participante.puntos += puntos;
        guardarDatos();
        generarTabla();
    }
}

// Función para quitar puntos a un participante
function quitarPuntos(index) {
    var puntos = parseInt(prompt('Ingrese la cantidad de puntos a quitar:', '0'), 10);

    if (!isNaN(puntos)) {
        var participante = participantes[index];
        participante.puntos -= puntos;
        if (participante.puntos < 0) {
            participante.puntos = 0;
        }
        guardarDatos();
        generarTabla();
    }
}

// Función para guardar los datos en localStorage
function guardarDatos() {
    localStorage.setItem('participantes', JSON.stringify(participantes));
}

// Generar la tabla inicial
generarTabla();
