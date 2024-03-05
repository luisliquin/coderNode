# DESAFÍO ENTREGABLE: Manejo de Archivos con `ProductManager`

## Consigna

El objetivo de este desafío es crear una clase llamada `ProductManager` que permita gestionar múltiples productos. Esta clase debe ser capaz de agregar, consultar, modificar y eliminar productos, gestionando la persistencia de estos en archivos.

### Aspectos a Incluir

- La clase deberá contar con una variable `this.path`, que se inicializará desde el constructor. Esta variable debe recibir la ruta del archivo a trabajar desde el momento de generar su instancia.

- Los objetos producto deben guardarse con el siguiente formato:
  - `id`: Identificador único que se debe incrementar automáticamente (no se envía desde el cuerpo de la solicitud).
  - `title`: Nombre del producto.
  - `description`: Descripción del producto.
  - `price`: Precio del producto.
  - `thumbnail`: Ruta de la imagen del producto.
  - `code`: Código identificador del producto.
  - `stock`: Número de piezas disponibles del producto.

### Aclaracionm sobre la organizacion de los archivos

- La clase se encuentra dentro de la carpeta Model.
- El documento json se encuentra dentro de la carpeta Document

## Proceso de Testing

Para verificar el correcto funcionamiento de la clase `ProductManager`, se seguirá el siguiente proceso:

1. **Creación de Instancia**: Se creará una instancia de la clase `ProductManager`.

2. **Consulta Inicial**: Se invocará el método `getProducts` justo después de crear la instancia, esperando como resultado un arreglo vacío `[]`.

3. **Agregar Producto**: Se utilizará el método `addProduct` para agregar un producto con los siguientes campos:
   - `title`: "producto prueba"
   - `description`: "Este es un producto prueba"
   - `price`: 200
   - `thumbnail`: "Sin imagen"
   - `code`: "abc123"
   - `stock`: 25
   - Se espera que el objeto se agregue satisfactoriamente con un `id` generado automáticamente y sin repetirse.

4. **Consulta de Productos**: Se llamará nuevamente al método `getProducts`, esta vez esperando ver el producto recién agregado en el resultado.

5. **Búsqueda por ID**: Se empleará el método `getProductById` para verificar que devuelva correctamente el producto con el `id` especificado. En caso de no existir, debe lanzar un error.

6. **Actualización de Producto**: Se usará el método `updateProduct` para intentar modificar un campo de algún producto, asegurándose de que el `id` no se elimine y que la actualización sea efectiva.

7. **Eliminación de Producto**: Finalmente, se invocará el método `deleteProduct` para eliminar un producto, comprobando que el producto se haya eliminado correctamente o que se lance un error si el producto no existe.

Este proceso de testing asegurará que la clase `ProductManager` funciona como se espera, permitiendo una gestión eficaz de los productos en persistencia de archivos.