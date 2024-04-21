# Segunda pre-entrega de tu proyecto final

Deberás entregar el proyecto que has venido armando, cambiando persistencia en base de datos, además de agregar algunos endpoints nuevos a tu ecommerce.

## Profesionalizando la BD

### Objetivos generales

- Contarás con Mongo como sistema de persistencia principal.
- Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

### Objetivos específicos

- Profesionalizar las consultas de productos con filtros, paginación y ordenamientos.
- Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

### Formato

- Link al repositorio de Github, sin la carpeta de node_modules.

### Sugerencias

- Permitir comentarios en el archivo.
- La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia.
- Los nuevos endpoints deben seguir la misma estructura y lógica que hemos seguido.

### Se debe entregar

Con base en nuestra implementación actual de productos, modificar el método `GET /` para que cumpla con los siguientes puntos:

- Deberá poder recibir por query params un `limit` (opcional), una `page` (opcional), un `sort` (opcional) y un `query` (opcional):
  - `limit` permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
  - `page` permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1.
  - `query`, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general.
  - `sort`: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento.

El método `GET` deberá devolver un objeto con el siguiente formato:

{
  "status": "success/error",
  "payload": "Resultado de los productos solicitados",
  "totalPages": "Total de páginas",
  "prevPage": "Página anterior",
  "nextPage": "Página siguiente",
  "page": "Página actual",
  "hasPrevPage": "Indicador para saber si la página previa existe",
  "hasNextPage": "Indicador para saber si la página siguiente existe.",
  "prevLink": "Link directo a la página previa (null si hasPrevPage=false)",
  "nextLink": "Link directo a la página siguiente (null si hasNextPage=false)"
}

## Búsqueda y Ordenamiento de Productos

Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.

## Endpoints para Carritos

### Modificaciones en el Router de Carritos

- `DELETE /api/carts/:cid/products/:pid`: Eliminará del carrito el producto seleccionado.
- `PUT /api/carts/:cid`: Actualizará el carrito con un arreglo de productos con el formato especificado anteriormente.
- `PUT /api/carts/:cid/products/:pid`: Permitirá actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde `req.body`.
- `DELETE /api/carts/:cid`: Eliminará todos los productos del carrito.

### Modelado de Carts

Para el modelo de Carts, en su propiedad `products`, el id de cada producto generado dentro del array debe hacer referencia al modelo de Products. Se debe modificar la ruta `/:cid` para que al traer todos los productos, los traiga completos mediante un `populate`. De esta forma, almacenamos sólo el ID, pero al solicitarlo podemos desglosar los productos asociados.

## Visualización de Productos

### Router de Vistas

- Crear una vista en `/products` para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
  1. Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
  2. Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

### Visualización de Carritos Específicos

- Agregar una vista en `/carts/:cid` (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenecen a dicho carrito.
