//Requerimiento solicitado clase producto
class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1; //inicio el id con el valor de 1
    }
    
    //metodo para agregar un nuevo producto
    addProduct({ title, description, price, thumbnail, code, stock }) {
      if (this.products.find(product => product.code === code)) {
        throw new Error('El código del producto ya existe.');
      }
  
      const newProduct = {
        id: this.nextId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
      return newProduct;
    }
  
    //metodo para obtener todos los productos
    getProducts() {
      return this.products;
    }
  
    //metodo para obtner solo un producto
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        throw new Error('Producto no encontrado.');
      }
      return product;
    }
  }

  //caso de prueba instanciando un nuevo producto
  const manager = new ProductManager();
  
  try {
    //obtengo todos los productos
    console.log('caso de prueba getProducts');
    console.log(manager.getProducts());
  
    console.log('caso de prueba addProduct');
    manager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25
    });
    
    console.log('caso de prueba getProducts con el nuevo insert');
    console.log(manager.getProducts());

    console.log('caso de prueba nuevo addProduct con id repetido');
    manager.addProduct({
      title: "nuevo producto prueba",
      description: "Otro producto prueba",
      price: 300,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 30
    });
  
  } catch (error) {
    console.error(error.message);
  }
  
  try {
    console.log('caso de prueba getProducts');
    console.log(manager.getProducts()); 
    console.log('caso de prueba getProductById 1');
    console.log(manager.getProductById(1)); 
    console.log('caso de prueba getProductById 999');
    console.log(manager.getProductById(999));

  } catch (error) {
    console.error(error.message);
  }