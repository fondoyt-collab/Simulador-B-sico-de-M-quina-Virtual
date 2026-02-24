// js/maquina.js

export default class Maquina {
    constructor() {
        // DÍA 1: Arquitectura básica
        this.AX = 0;
        this.BX = 0;
        this.CX = 0;
        this.pila = [];
    }

    // DÍA 3: Métodos base
    incrementar(registro) {
        if (this.hasOwnProperty(registro)) {
            this[registro]++;
        }
    }

    decrementar(registro) {
        if (this.hasOwnProperty(registro)) {
            this[registro]--;
        }
    }

    // DÍA 4: Comparación
    comparar() {
        if (this.AX === this.BX) return "AX es IGUAL a BX";
        return this.AX > this.BX ? "AX es MAYOR que BX" : "AX es MENOR que BX";
    }

    // DÍA 6: Ciclo controlado (FOR)
    loopIncrementar(registro, veces) {
        const n = parseInt(veces);
        if (isNaN(n)) return "Error: Cantidad de ciclos no es un número.";
        
        for (let i = 0; i < n; i++) {
            this.incrementar(registro);
        }
        return `LOOP finalizado: ${n} iteraciones en ${registro}.`;
    }

    // DÍA 7: Ciclo condicional (WHILE) con Límite de Seguridad
    incrementarHasta(registro, limite) {
        let contador = 0;
        const MAX_SEGURIDAD = 1000; // Límite de seguridad Día 7
        const valorDestino = parseInt(limite);

        if (isNaN(valorDestino)) return "Error NaN: Límite inválido.";
        if (!this.hasOwnProperty(registro)) return "Error: Registro no existe.";

        // Ciclo automático con protección
        while (this[registro] < valorDestino && contador < MAX_SEGURIDAD) {
            this.incrementar(registro);
            contador++;
        }

        // Entregable Día 7: Mostrar contador y alerta
        if (contador >= MAX_SEGURIDAD) {
            return `⚠️ Seguridad: Límite de ${MAX_SEGURIDAD} ciclos alcanzado.`;
        }
        return `While exitoso: ${contador} ciclos realizados para llegar a ${valorDestino}.`;
    }
}