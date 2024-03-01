import fs from "fs";

export class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.readProductsFromFile();
  }
  
  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error("Error durante la lectura del archivo:", error.message);
      this.products = [];
    } 
  }

  //metodo para obtener todos los productos
  getProducts() {
    this.readProductsFromFile();
    return this.products;
  }

  //metodo para obtner solo un producto
  getProductById(id) {
    this.readProductsFromFile();
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }
}
