# 💻 Simulador de Máquina Virtual - Mini-SCRUM

Este proyecto es un simulador funcional de una arquitectura de computadora básica, desarrollado bajo una metodología **mini-SCRUM académico**. A lo largo de 8 sprints diarios, se construyó un sistema capaz de procesar registros, ejecutar operaciones aritméticas, manejar ciclos controlados y validar entradas de forma robusta.

---

## 🚀 Características Principales

* **Arquitectura de Registros**: Simulación de registros `AX`, `BX` y `CX` con visualización en tiempo real.
* **Sistema de Comandos**: Terminal interna que procesa instrucciones mediante un motor `switch`.
* **Lógica de Ciclos**: Implementación de bucles `LOOP` (for) y `WHILE` (condicional).
* **Seguridad y Robustez**: Límite de seguridad de 1000 iteraciones para evitar bucles infinitos y validación de errores NaN con alertas visuales.

---

## 📅 Bitácora de Desarrollo (Sprints)

| Día | Hito | Descripción |
| :--- | :--- | :--- |
| **1-2** | **Arquitectura y Aritmética** | Definición de registros, pila y operaciones básicas (Suma, Resta, Multiplicación, División). |
| **3-4** | **Dinámica y Comparación** | Incremento/Decremento dinámico y sistema de comparación de registros sin alertas externas. |
| **5-6** | **Comandos y Ciclos** | Creación de la mini-consola interna y simulación de instrucciones `LOOP`. |
| **7-8** | **Seguridad y Validación** | Ciclos `WHILE` con límite de seguridad y sistema robusto de captura con manejo de errores. |

---

## 🛠️ Tecnologías Utilizadas

* **HTML5** - Estructura del simulador.
* **CSS3** - Interfaz de usuario y estética de terminal Linux.
* **JavaScript (ES6+)** - Lógica de programación orientada a objetos (POO) y manipulación del DOM.

---

## 📖 Instrucciones de Uso

1.  **Modo Manual**: Utiliza los botones superiores para incrementar o comparar registros rápidamente.
2.  **Modo Terminal**: Escribe comandos directamente en la consola inferior:
    * `INC AX` - Incrementa el registro AX.
    * `LOOP BX 10` - Incrementa BX 10 veces.
    * `WHILE CX 50` - Incrementa CX hasta llegar a 50 (máximo 1000 ciclos por seguridad).
    * `CLR` - Reinicia todos los registros a cero.

---

## ⚙️ Instalación y Ejecución

1.  Clona este repositorio:
    ```bash
    git clone [https://github.com/fondoyt-collab/Simulador-B-sico-de-M-quina-Virtual.git)
    ```
2.  Abre el archivo `index.html` en tu navegador favorito (Recomendado: **Opera GX** o **Chrome**).

---
Desarrollado como parte del curso de **Lenguajes de Interfaz** - Tec Enero-Mayo 2026.
