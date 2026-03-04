import Maquina from './maquina.js';

// Inicializamos la Máquina Virtual
const miVM = new Maquina();

// Referencias al DOM (HTML)
const consola = document.getElementById('consola');
const inputCmd = document.getElementById('cmd-input');
const selectReg = document.getElementById('select-reg');

/**
 * Función Principal de Actualización Visual
 * Se ejecuta después de cada comando para refrescar todos los datos en pantalla.
 */
function actualizarInterfaz() {
    // 1. Actualizar Registros (Decimal, Hex, Binario)
    ['AX', 'BX', 'CX'].forEach(reg => {
        // Valor Decimal
        document.getElementById(`val-${reg}`).innerText = miVM[reg];
        
        // Valor Hexadecimal (Día 11)
        // Nota: Asegúrate de tener los <span id="hex-AX"> en tu HTML
        const elHex = document.getElementById(`hex-${reg}`);
        if (elHex) elHex.innerText = miVM.hexadecimal(reg);

        // Valor Binario (Día 12)
        const elBin = document.getElementById(`bin-${reg}`);
        if (elBin) elBin.innerText = miVM.binario(reg);
    });

    // 2. Actualizar la Tabla de la Pila (Día 10)
    actualizarPilaVisual();
}

/**
 * Renderiza la Pila en la tabla HTML
 * Muestra el tope (último dato) en la parte superior.
 */
function actualizarPilaVisual() {
    const body = document.getElementById('pila-body');
    if (!body) return; // Protección si no existe la tabla

    if (miVM.pila.length === 0) {
        body.innerHTML = '<tr><td colspan="2">Pila Vacía</td></tr>';
        return;
    }

    // Creamos las filas de la tabla invirtiendo el arreglo (LIFO)
    body.innerHTML = [...miVM.pila].reverse().map((val, index) => `
        <tr>
            <td>${index === 0 ? 'TOP (SP)' : `SP-${index}`}</td>
            <td>${val}</td>
        </tr>
    `).join('');
}

/**
 * Escribe mensajes en la terminal negra
 * Soporta colores para errores o alertas.
 */
function escribirConsola(mensaje) {
    const div = document.createElement('div');
    
    // Detectar si es un error para ponerlo en rojo
    const esError = mensaje.includes('Error') || mensaje.includes('⚠️');
    
    div.style.color = esError ? "#ff4444" : "#2ecc71"; // Rojo o Verde Matrix
    div.style.fontFamily = "'Consolas', monospace";
    
    // Timestamp para registro profesional
    const hora = new Date().toLocaleTimeString();
    div.innerHTML = `[${hora}] > ${mensaje.replace(/\n/g, '<br>')}`; // Soporte para saltos de línea
    
    consola.appendChild(div);
    consola.scrollTop = consola.scrollHeight; // Auto-scroll al final
}

/**
 * Procesador de Entrada
 * Envía el texto crudo a la máquina y muestra la respuesta.
 */
function procesar(texto) {
    if (!texto || texto.trim() === '') return;

    // Enviamos el comando a la lógica central (Switch Maestro en maquina.js)
    const respuesta = miVM.ejecutarComando(texto);

    escribirConsola(respuesta);
    actualizarInterfaz();
}

// --- EVENTOS DEL USUARIO ---

// 1. Detectar tecla ENTER en el input
inputCmd.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        procesar(inputCmd.value);
        inputCmd.value = ''; // Limpiar input
    }
});

// 2. Función Global para los Botones del HTML
// Se asigna a window para que el HTML pueda verla (onclick="ejecutarAccion(...)")
window.ejecutarAccion = function(cmd) {
    const registro = selectReg.value;

    // Comandos que NO necesitan registro ni valor extra
    if (['STATUS', 'CLR', 'LOGIC', 'COMP'].includes(cmd)) {
        procesar(cmd);
    } 
    // Comandos que requieren registro (INC, DEC, PUSH, POP, SHL, SHR)
    else {
        procesar(`${cmd} ${registro}`);
    }
};

// 3. Carga Inicial
window.onload = () => {
    actualizarInterfaz();
    escribirConsola("SISTEMA VIRTUAL v5.0 INICIADO.");
    escribirConsola("Listo para operaciones lógicas y de bits.");
};