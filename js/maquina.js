export default class Maquina {
    constructor() {
        // DÍA 1: Arquitectura básica [cite: 16]
        this.AX = 0;
        this.BX = 0;
        this.CX = 0;
        this.pila = []; // DÍA 10: Pila [cite: 76]
    }

    // --- PROCESADOR DE COMANDOS CENTRAL (DÍAS 5-13) ---
    ejecutarComando(input) {
        const partes = input.trim().toUpperCase().split(/\s+/);
        const cmd = partes[0];
        const arg1 = partes[1];
        const arg2 = partes[2];

        switch (cmd) {
            case 'INC':
                this.incrementar(arg1 || 'AX');
                return `INC: ${arg1 || 'AX'} incrementado.`;
            case 'DEC':
                this.decrementar(arg1 || 'AX');
                return `DEC: ${arg1 || 'AX'} decrementado.`;
            case 'COMP':
                return this.comparar(); // DÍA 4 [cite: 37]
            case 'LOOP':
                return this.loopIncrementar(arg1, arg2); // DÍA 6 [cite: 51]
            case 'WHILE':
                return this.incrementarHasta(arg1, arg2); // DÍA 7 [cite: 58]
            case 'PUSH':
                return this.push(arg1); // DÍA 10 [cite: 78]
            case 'POP':
                return this.pop(arg1 || 'AX'); // DÍA 10 [cite: 78]
            case 'SHL':
                this.desplazarIzq(arg1 || 'AX'); // DÍA 12 [cite: 91]
                return `SHL: Desplazamiento Izq. en ${arg1 || 'AX'}.`;
            case 'SHR':
                this.desplazarDer(arg1 || 'AX'); // DÍA 12 [cite: 91]
                return `SHR: Desplazamiento Der. en ${arg1 || 'AX'}.`;
            case 'LOGIC':
                return this.evaluarCondicionCompleja(); // DÍA 13 [cite: 98]
            case 'STATUS':
                return this.estadoActual(); // DÍA 9 [cite: 71]
            case 'CLR':
                this.AX = 0; this.BX = 0; this.CX = 0; this.pila = [];
                return "SISTEMA REINICIADO.";
            default:
                return `ERROR: Comando '${cmd}' no reconocido.`;
        }
    }

    // --- MÉTODOS OPERATIVOS ---

    incrementar(registro) {
        if (this.hasOwnProperty(registro)) this[registro] = (this[registro] + 1) & 0xFF;
    }

    decrementar(registro) {
        if (this.hasOwnProperty(registro)) this[registro] = (this[registro] - 1) & 0xFF;
    }

    comparar() {
        if (this.AX === this.BX) return "COMPARACIÓN: AX es IGUAL a BX";
        return this.AX > this.BX ? "COMPARACIÓN: AX es MAYOR que BX" : "COMPARACIÓN: AX es MENOR que BX";
    }

    // DÍA 6: Ciclo FOR [cite: 49]
    loopIncrementar(registro, veces) {
        const n = parseInt(veces);
        if (isNaN(n)) return "Error: Cantidad inválida.";
        for (let i = 0; i < n; i++) this.incrementar(registro);
        return `LOOP: ${n} iteraciones en ${registro}.`;
    }

    // DÍA 7: WHILE con seguridad [cite: 56]
    incrementarHasta(registro, limite) {
        let contador = 0;
        const MAX_SEGURIDAD = 1000; // [cite: 59]
        const destino = parseInt(limite);
        if (isNaN(destino)) return "Error: Límite inválido.";
        
        while (this[registro] < destino && contador < MAX_SEGURIDAD) {
            this.incrementar(registro);
            contador++;
        }
        return contador >= MAX_SEGURIDAD ? "⚠️ ALERTA: Límite de seguridad alcanzado." : `WHILE: Finalizado en ${contador} ciclos.`;
    }

    // DÍA 10: Pila [cite: 76]
    push(valor) {
        let n = this.hasOwnProperty(valor) ? this[valor] : parseInt(valor);
        if (isNaN(n)) return "Error PUSH: Valor inválido.";
        this.pila.push(n & 0xFF);
        return `PUSH: ${n & 0xFF} apilado.`;
    }

    pop(registro) {
        if (this.pila.length === 0) return "Error: Pila vacía.";
        if (!this.hasOwnProperty(registro)) return "Error: Registro destino inválido.";
        this[registro] = this.pila.pop();
        return `POP: Valor extraído a ${registro}.`;
    }

    // DÍA 11 y 12: Bases y Bits [cite: 82, 89]
    hexadecimal(reg) { return "0x" + (this[reg] >>> 0).toString(16).toUpperCase().padStart(2, '0'); }
    binario(reg) { return (this[reg] >>> 0).toString(2).padStart(8, '0'); }
    
    desplazarIzq(reg) { if (this.hasOwnProperty(reg)) this[reg] = (this[reg] << 1) & 0xFF; }
    desplazarDer(reg) { if (this.hasOwnProperty(reg)) this[reg] = (this[reg] >> 1) & 0xFF; }

    // DÍA 13: Lógica Compuesta y Tablas de Verdad 
    evaluarCondicionCompleja() {
        // Ejemplo de condición compleja: (AX > 10) AND (BX es PAR)
        const condicionP = this.AX > 10;
        const condicionQ = (this.BX % 2 === 0);
        const resultado = condicionP && condicionQ;

        return `
🔍 EVALUACIÓN LÓGICA (AND):
------------------------------
Proposición P (AX > 10):   ${condicionP ? 'VERDADERO' : 'FALSO'}
Proposición Q (BX es PAR): ${condicionQ ? 'VERDADERO' : 'FALSO'}
------------------------------
RESULTADO FINAL (P && Q):  ${resultado ? 'VERDADERO' : 'FALSO'}
------------------------------
📘 TABLA DE VERDAD (AND):
   P   |   Q   | P && Q
-----------------------
   V   |   V   |   V
   V   |   F   |   F
   F   |   V   |   F
   F   |   F   |   F
`; 
// 
    }

    // DÍA 9: Estado Profesional [cite: 69]
    estadoActual() {
        return `ESTADO DEL SISTEMA:
-----------------------
AX: ${this.AX} (${this.hexadecimal('AX')})
BX: ${this.BX} (${this.hexadecimal('BX')})
CX: ${this.CX} (${this.hexadecimal('CX')})
PILA: [${this.pila.join(', ')}]
-----------------------`;
    }
}