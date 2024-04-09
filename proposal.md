# Propuesta TP DSW

## Grupo

### Integrantes

- 49831 - Nicola, Valentino (com 302)
- 48808 - Ramírez, Facundo (com 302)

### Repositorios

- [frontend app](https://github.com/facumrb/Libreria-LaElsi/tree/main/Front-End)
- [backend app](https://github.com/facumrb/Libreria-LaElsi/tree/main/Back-End)

## Tema

### Descripción

La librería “LaElsi” es un negocio dedicado a la venta de productos de librería, juguetería, imprenta digital y sellos. El sitio web debe contemplar ventas, administración y distribución de pedidos desde cualquier parte de Rosario, con el objetivo de ofrecer y expandir los servicios del negocio a más personas.

### Modelo

![Modelo de dominio](/Imagenes/ModeloDeDominio-MD-Simplificado.png)

_Nota_: Actualizar modelo y utilizar diagramas con [Mermaid](https://mermaid.js.org) en lugar de imágenes.

## Alcance Funcional

Desde que el cliente entra al sitio web para hacer un pedido hasta que se registran los datos del pedido en el historial de pedidos.

### Alcance Mínimo

_Nota_: Completar lo que falta (listados y CUU).

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Cliente<br>2. CRUD Juguete<br>3. CRUD Librería<br>4. CRUD Forma de Pago|
|CRUD dependiente|1. CRUD Pedido {depende de} CRUD Cliente<br>2. CRUD Venta {depende de} CRUD Pedido|
|Listado<br>+<br>detalle (Hacer)| 1. Listado de habitaciones filtrado por tipo de habitación, muestra nro y tipo de habitación => detalle CRUD Habitacion<br> 2. Listado de reservas filtrado por rango de fecha, muestra nro de habitación, fecha inicio y fin estadía, estado y nombre del cliente => detalle muestra datos completos de la reserva y del cliente|
|CUU/Epic (Hacer)|1. Reservar una habitación para la estadía<br>2. Realizar el check-in de una reserva|

Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Juguete<br>2. CRUD Librería<br>3. CRUD Computación<br>4. CRUD Sello<br>5. CRUD Cliente<br>6. CRUD Pedido<br>7. CRUD Venta<br>8. CRUD Forma de Pago|
|CUU/Epic (Hacer)|1. Reservar una habitación para la estadía<br>2. Realizar el check-in de una reserva<br>3. Realizar el check-out y facturación de estadía y servicios|

### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados (Hacer)|1. Estadía del día filtrado por fecha muestra, cliente, habitaciones y estado <br>2. Reservas filtradas por cliente muestra datos del cliente y de cada reserve fechas, estado cantidad de habitaciones y huespedes |
|CUU/Epic (Hacer)| 1. Consumir servicios<br>2. Cancelación de reserva|
|Otros (Hacer)| 1. Envío de recordatorio de reserva por email|