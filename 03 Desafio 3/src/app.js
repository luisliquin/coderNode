const ProductManager = require("./Model/ProductManager");

//caso de prueba instanciando un nuevo producto//
const manager = new ProductManager("./Document/Products.json");

const productos = [
  {
    title: "Mate",
    description: "Hierbas serranas",
    price: 2000,
    thumbnail: "Sin imagen",
    code: "PRD-001",
    stock: 25,
  },
  {
    title: "Cafe",
    description: "Cafe instantaneo",
    price: 3000,
    thumbnail: "Sin imagen",
    code: "PRD-002",
    stock: 10,
  },
  {
    title: "Harina",
    description: "Harina triple 0",
    price: 1500,
    thumbnail: "Sin imagen",
    code: "PRD-003",
    stock: 25,
  },
  {
    title: "Palmito",
    description: "Palmito",
    price: 4000,
    thumbnail: "Sin imagen",
    code: "PRD-004",
    stock: 25,
  },
  // Prueba de agregar un producto con código repetido
  {
    title: "nuevo producto prueba",
    description: "Otro producto prueba",
    price: 300,
    thumbnail: "Sin imagen",
    code: "PRD-001",
    stock: 30,
  },
];

productos.forEach((producto) => {
  try {
    console.log("caso de prueba addProduct");
    manager.addProduct(producto);
    console.log(`Producto agregado: ${producto.title}`);
  } catch (error) {
    console.error(
      `Error al agregar producto ${producto.title}:`,
      error.message
    );
  }
});

//caso de prueba actualizando un producto//
try {
  console.log("caso de prueba updateProduct");
  manager.updateProduct(3, {
    title: "Harina",
    description: "Ideal para hacer pizzas",
    price: 1350,
    thumbnail: "nueva-url-de-la-imagen",
    code: "PRD-003",
    stock: 25,
  });
} catch (error) {
  console.error("mesanje de error", error.message);
}

//caso de prueba eliminando un producto//
try {
  console.log("caso de prueba deleteProduct");
  manager.deleteProduct(4);
} catch (error) {
  console.error("mesanje de error", error.message);
}

try {
  console.log("caso de prueba getProducts");
  console.log(manager.getProducts());
  console.log("caso de prueba getProductById 3 - id actualizado");
  console.log(manager.getProductById(3));
  console.log("caso de prueba getProductById 4 -- id eliminado");
  console.log(manager.getProductById(4));
} catch (error) {
  console.error("mensaje de error", error.message);
}
