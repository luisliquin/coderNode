# Primera Entrega del Proyecto Final

## Descripción

Se desarrollará un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra en el e-commerce.

## Requerimientos

Desarrollar el servidor basado en **Node.JS y express**, que escuche en el puerto `8080` y disponga de dos grupos de rutas: `/products` y `/carts`. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

### Manejo de Productos

El router en `/api/products/` deberá configurar las siguientes rutas:

- **GET /**: Listará todos los productos de la base. (Incluyendo la limitación `?limit` del desafío anterior)
- **GET /:pid**: Traerá sólo el producto con el id proporcionado.
- **POST /**: Agregará un nuevo producto con los campos especificados.
  - `id`: Number/String, autogenerado, asegurando que nunca se repitan.
  - `title`: String,
  - `description`: String,
  - `code`: String,
  - `price`: Number,
  - `status`: Boolean (true por defecto),
  - `stock`: Number,
  - `category`: String,
  - `thumbnails`: Array de Strings con las rutas de las imágenes.
- **PUT /:pid**: Actualizará un producto por los campos enviados desde body sin actualizar o eliminar el id.
- **DELETE /:pid**: Eliminará el producto con el pid indicado.

### Manejo del Carrito

El router en `/api/carts/` configurará dos rutas:

- **POST /**: Creará un nuevo carrito con la estructura especificada.
  - `Id`: Number/String, autogenerado.
  - `products`: Array que contendrá objetos que representen cada producto.
- **GET /:cid**: Listará los productos que pertenezcan al carrito con el parámetro cid proporcionados.
- **POST /:cid/product/:pid**: Agregará el producto al arreglo “products” del carrito seleccionado bajo el formato especificado.

La persistencia de la información se implementará utilizando el file system, con archivos “productos.json” y “carrito.json”.

## Formato de Entrega

- Proporciona el link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules.

## Sugerencias

- No olvides `app.use(express.json())`.
- No es necesario implementar multer.
- Incluye un link al video donde se explica el proyecto.