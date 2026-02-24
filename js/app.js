// js/app.js
import Maquina from './maquina.js';

const miVM = new Maquina();

// Selección de elementos de la interfaz
const displays = {
    AX: document.getElementById('val-AX'),
    BX: document.getElementById('val-BX'),
    CX: document.getElementById('val-CX')
};
const selectRegistro = document.getElementById('select-reg');
const panelConsola = document.getElementById('consola');
const inputComando = document.getElementById('cmd-input');

// DÍA 1: Función para actualizar los registros en pantalla
function actualizarInterfaz() {
    if (displays.AX) displays.AX.innerText = miVM.AX;
    if (displays.BX) displays.BX.innerText = miVM.BX;
    if (displays.CX) displays.CX.innerText = miVM.CX;
}

// DÍA 4 y 8: Manejo visual de mensajes y errores
function escribirConsola(mensaje, esError = false) {
    const linea = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString();
    
    // DÍA 8: Manejo visual de errores (Color rojo si esError es true)
    linea.style.color = esError ? "#ff4444" : "#00ff00";
    linea.style.fontWeight = esError ? "bold" : "normal";
    
    linea.innerHTML = `<span>[${timestamp}]</span> > ${mensaje}`;
    panelConsola.prepend(linea);
}

// DÍA 8: Sistema robusto de validación NaN
function validarEntrada(comando, registro, valor) {
    // Lista de comandos que requieren un parámetro numérico
    const comandosNumericos = ['LOOP', 'WHILE'];

    if (comandosNumericos.includes(comando)) {
        if (isNaN(parseInt(valor))) {
            escribirConsola(`Error NaN: '${valor}' no es un número válido para el comando ${comando}.`, true);
            return false;
        }
    }
    return true;
}

// Procesador de comandos (DÍA 5 al 8)
function ejecutarProcesador(texto) {
    const partes = texto.trim().toUpperCase().split(' ');
    const cmd = partes[0];
    const reg = partes[1] || 'AX';
    const val = partes[2];

    // DÍA 8: Validación de entrada profesional
    if (!validarEntrada(cmd, reg, val)) return;

    let resultado;
    switch (cmd) {
        case 'INC':
            miVM.incrementar(reg);
            resultado = `Incrementado ${reg}.`;
            break;
        case 'DEC':
            miVM.decrementar(reg);
            resultado = `Decrementado ${reg}.`;
            break;
        case 'COMP':
            resultado = miVM.comparar();
            break;
        case 'LOOP':
            // DÍA 6: Ciclo for
            resultado = miVM.loopIncrementar(reg, val);
            break;
        case 'WHILE':
            // DÍA 7: Ciclo automático con protección
            resultado = miVM.incrementarHasta(reg, val);
            break;
        case 'CLR':
            miVM.AX = 0; miVM.BX = 0; miVM.CX = 0;
            resultado = "Registros reiniciados.";
            break;
        default:
            escribirConsola(`Error: Comando '${cmd}' no reconocido.`, true);
            return;
    }

    actualizarInterfaz();
    escribirConsola(resultado);
}

// EVENTOS
// Ejecutar mediante el input de texto (DÍA 5)
inputComando.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        ejecutarProcesador(inputComando.value);
        inputComando.value = '';
    }
});

// Eventos de botones rápidos
document.getElementById('btn-inc').onclick = () => ejecutarProcesador(`INC ${selectRegistro.value}`);
document.getElementById('btn-dec').onclick = () => ejecutarProcesador(`DEC ${selectRegistro.value}`);
document.getElementById('btn-comp').onclick = () => ejecutarProcesador('COMP');

// Mensaje inicial
window.onload = () => {
    actualizarInterfaz();
    escribirConsola("Simulador Robusto v3.0 iniciado.");
};