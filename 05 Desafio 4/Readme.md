# Websockets

## Consigna

Configurar nuestro proyecto para que trabaje con Handlebars y websocket.

### Aspectos a incluir

- Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
- Crear una vista `home.handlebars` la cual contenga una lista de todos los productos agregados hasta el momento.
- Además, crear una vista `realTimeProducts.handlebars`, la cual vivirá en el endpoint `/realtimeproducts` en nuestro views router. Ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.
- Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.

### Sugerencias

- Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, se cree un formulario simple en la vista `realTimeProducts.handlebars`. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
- Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?

### Formato de entrega

- Link al repositorio de Github, el cual debe contar con todo el proyecto.
- No incluir `node_modules`

## PROCESO DE TESTING

### Websockets

1. Se instalará y correrá el servidor en el puerto indicado.
2. El servidor debe levantarse sin problema.
3. Se abrirá la ruta raíz.
   - Debe visualizarse el contenido de la vista `index.handlebars`.
   - No se debe activar el websocket aún.
4. Se buscará en la URL del navegador la ruta `/realtimeproducts`.
   - Se corroborará que el servidor haya conectado con el cliente, en la consola del servidor deberá mostrarse un mensaje de “cliente conectado”.
   - Se debe mostrar la lista de productos y se corroborará que se esté enviando desde websocket.