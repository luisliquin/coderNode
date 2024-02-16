# Clases con ECMAScript y ECMAScript avanzado

## Consigna

El objetivo de este proyecto es realizar una clase `ProductManager` que gestione un conjunto de productos. Esta clase se encargará de agregar, obtener y buscar productos por su identificador único.

### Aspectos a incluir

- La clase debe crearse con el elemento `products`, el cual será un arreglo vacío inicialmente.
- Cada producto gestionado debe contar con las propiedades:
  - `title`: Nombre del producto.
  - `description`: Descripción del producto.
  - `price`: Precio.
  - `thumbnail`: Ruta de imagen.
  - `code`: Código identificador.
  - `stock`: Número de piezas disponibles.

### Métodos Requeridos

1. **addProduct**: Agrega un producto al arreglo de productos. Debe validar que no se repita el campo `code` y que todos los campos sean obligatorios. Al agregarlo, debe asignarse un `id` autoincrementable.
   
2. **getProducts**: Devuelve el arreglo con todos los productos creados hasta el momento.

3. **getProductById**: Busca en el arreglo el producto que coincida con el `id` proporcionado. En caso de no encontrar coincidencia, muestra en consola un error “Not found”.

## Formato del Entregable

El proyecto será entregado como un archivo de JavaScript listo para ser ejecutado desde Node.js.

## Proceso de Testing

Para validar el correcto funcionamiento de la clase `ProductManager`, se seguirá el siguiente proceso:

1. Crear una instancia de la clase `ProductManager`.
2. Llamar al método `getProducts` inmediatamente después de crear la instancia, esperando como resultado un arreglo vacío `[]`.
3. Utilizar el método `addProduct` para agregar un producto con los siguientes campos:
   - `title`: "producto prueba"
   - `description`: "Este es un producto prueba"
   - `price`: 200
   - `thumbnail`: "Sin imagen"
   - `code`: "abc123"
   - `stock`: 25
4. El producto debe agregarse satisfactoriamente con un `id` generado automáticamente sin repetirse.
5. Llamar al método `getProducts` nuevamente; esta vez debe aparecer el producto recién agregado.
6. Intentar agregar otro producto con el mismo `code` debería arrojar un error, indicando que el código está repetido.
7. Probar el método `getProductById` para evaluar que devuelva un error si no encuentra el producto, o el producto en caso de encontrarlo.
