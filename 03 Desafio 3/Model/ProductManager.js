const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.readProductsFromFile();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      this.products = JSON.parse(data);
      this.nextId =
        this.products.length > 0
          ? Math.max(...this.products.map((p) => p.id)) + 1
          : 1;
    } catch (error) {
      console.error("Error reading products from file:", error.message);
      this.products = [];
    } finally {
      console.log("Finalizacion de readProductsFromFIle");
    }
  }

  //metodo para la escritura de archivos
  writeProductsToFile() {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.products, null, 2),
      "utf-8"
    );
  }

  findProductIndex(id) {
    return this.products.findIndex((product) => product.id === id);
  }

  //metodo para agregar un nuevo producto
  addProduct({ title, description, price, thumbnail, code, stock }) {
    this.readProductsFromFile();
    if (this.products.find((product) => product.code === code)) {
      throw new Error("El código del producto ya existe.");
    }

    const newProduct = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.writeProductsToFile();
    return newProduct;
  }

  //metodo para obtener todos los productos
  getProducts() {
    this.readProductsFromFile();
    return this.products;
  }

  //metodo para obtner solo un producto
  getProductById(id) {
    this.readProductsFromFile();
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }

  //metodo para realizar la actualizacion del producto
  updateProduct(id, updates) {
    this.readProductsFromFile();
    const productIndex = this.findProductIndex(id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado.");
    }

    if (
      updates.code &&
      this.products.some(
        (product) => product.code === updates.code && product.id !== id
      )
    ) {
      throw new Error("El código del producto ya existe en otro producto.");
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updates,
    };
    this.writeProductsToFile();
    return this.products[productIndex];
  }

  // Método para eliminar un producto por ID
  deleteProduct(id) {
    this.readProductsFromFile();
    const productIndex = this.products.findIndex(id);

    if (productIndex === -1) {
      throw new Error("Producto no encontrado para eliminar.");
    }

    this.products.splice(productIndex, 1);
    this.writeProductsToFile();
    return { message: "Producto eliminado con éxito." };
  }
}

module.exports = ProductManager;
