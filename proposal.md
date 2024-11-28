# Propuesta TP DSW

## Grupo

### Integrantes

- 49831 - Nicola, Valentino (com 302)
- 48808 - Ramírez, Facundo  (com 302)

### Repositorios

- [frontend app](https://github.com/facumrb/Libreria-LaElsi/tree/main/Front-End)
- [backend app](https://github.com/facumrb/Libreria-LaElsi/tree/main/Back-End)

## Tema

### Descripción

La librería “LaElsi” es un negocio dedicado a la venta de productos de librería, juguetería, imprenta digital y sellos. El sitio web debe contemplar ventas, administración y distribución de pedidos desde cualquier parte de Rosario, con el objetivo de ofrecer y expandir los servicios del negocio a más personas.

### Modelo

![Modelo de dominio](/Imagenes/modeloDeDominioParaRegular.png)

_Nota_: Actualizar modelo y utilizar diagramas con [Mermaid](https://mermaid.js.org) en lugar de imágenes.

## Alcance Funcional

Desde que el cliente entra al sitio web para hacer un pedido hasta que se registran los datos del pedido en el historial de pedidos.

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Cliente (genera Dirección)<br>2. CRUD Categoría|
|CRUD dependiente|1. CRUD Producto {depende de} CRUD Categoría (genera Multimedia, HistorialPrecio, Item)|
|Listado<br>+<br>detalle|1. Listados de productos ordenados por menor precio, con límite de hasta 16 productos por página y con detalle al abrir producto|
|CUU/Epic|1. Dar de alta un Producto|

Adicionales para Aprobación (ver lo que falta agregar)
|Req|Detalle|
|:-|:-|
|CRUD|1. CRUD Cliente<br>2. CRUD Categoría<br>3. CRUD FormaPago|
|CRUDs dependientes|1. CRUD Pedido {depende de} CRUD Cliente y Producto<br>2. CRUD Venta {depende de} CRUD Pedido<br>3. CRUD ComprobanteVenta {depende de} CRUD Venta, Cliente y FormaPago<br>4. CRUD Producto {depende de} CRUD Categoría|
|Listado<br>+<br>detalle|1. Listado de productos más vendidos, con límite de hasta 16 productos por página y con detalle al abrir producto<br>2. Listado de productos ordenados por mayor precio, con límite de hasta 16 productos por página y con detalle al abrir producto|
|CUU/Epic|1. Dar de alta un Cliente<br>2. Crear Pedido<br>3. Crear Venta<br>4. Crear comprobante de venta<br>5. Actualizar stock|

### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados|1. Listado de productos divididos por secciones y subsecciones de artículos y luego ordenado por cantidad (Stock total)<br>2. Listado de pedidos realizados en el tiempo por el cliente.<br>3. Listado de artículos sin stock.<br>4. Listado de productos destacados en formato carrusel.<br>5. Listado de productos que se reservan por falta de stock.<br>6. Listado de pedidos que al empleado le falta armar.|
|CUU/Epic|1. Asignar/Eliminar promociones.<br>2. Agregar/Eliminar productos.|
|Otros|1. Contacto automático por email, whatsapp, etc.|
