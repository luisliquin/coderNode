const fs = require("fs");

//Requerimiento solicitado clase producto
class ProductManager {
    constructor(filePath) {
      this.filePath = filePath;
      this.products = this.readProductsFromFile();
      //inicio el id con el valor de 1
      this.nextId =
        this.products.length > 0
          ? Math.max(...this.products.map((p) => p.id)) + 1
          : 1;
    }
  
    //metodo para la lectura de archivos
    readProductsFromFile() {
      try {
        const data = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        return [];
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
      )
    }
  
    //metodo para agregar un nuevo producto
    addProduct({ title, description, price, thumbnail, code, stock }) {
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
      return this.products;
    }
  
    //metodo para obtner solo un producto
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
      this.writeProductsToFile();
      return product;
    }
  
    //metodo para realizar la actualizacion del producto
    updateProduct(id, { title, description, price, thumbnail, code, stock }) {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
        );
        
        if (productIndex === -1) {
        throw new Error("Producto no encontrado.");
      }
  
      if (
        this.products.some(
          (product) => product.code === code && product.id !== id
        )
      ) {
        throw new Error("El código del producto ya existe en otro producto.");
      }
  
      const updatedProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.writeProductsToFile();
      this.products[productIndex] = updatedProduct;
      return updatedProduct;
    }
  
    // Método para eliminar un producto por ID
    deleteProduct(id) {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );

      if (productIndex === -1) {
        throw new Error("Producto no encontrado para eliminar.");
      }
  
      this.products.splice(productIndex, 1);
      this.writeProductsToFile();
      return { message: "Producto eliminado con éxito." };
    }
  }
  
  module.exports =  ProductManager;