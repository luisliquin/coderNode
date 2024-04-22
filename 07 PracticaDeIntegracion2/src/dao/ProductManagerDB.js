import productModel from './models/ProductModel.js';
import { productValidator } from '../utils/productValidator.js';

export default class ProductManagerDB {
    async getProducts() {
        try {
            return await productModel.find().lean();
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    async getPaginateProducts(filter, options) {
        try {
          return await productModel.paginate(filter, options);
        } catch (error) {
          console.error(error.message);
          throw new Error("Error al buscar los productos");
        }
      }

    async getProductByID(pid) {
        const product = await productModel.findOne({_id: pid});
        if (!product) throw new Error(`El producto ${pid} no existe!`);
        return product;
    }

    async addProduct(product) {
        productValidator(product);
        const {title, description, code, price, stock, category, thumbnails} = product;
        try {
            const result = await productModel.create({title, description, code, price, stock, category, thumbnails: thumbnails ?? []});
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    }

    async updateProduct(pid, productUpdate) {
        try {
            if (!pid || !productUpdate) {
                console.error("Error: Todos los campos son obligatorios.");
                return;
            }
            const product = await productModel.findOne({_id: pid});
            if (!product) {
                console.error(`Error: Producto con ID ${id} no encontrado.`);
                return;
            }
            const result = await productModel.findOneAndUpdate({_id: pid}, productUpdate, {new: true});
            return result;
        } catch(error) {
            console.error(error.message);
            throw new Error('Error al actualizar el producto');
        }
    }

    async deleteProduct(pid) {
        try {
            const result = await productModel.deleteOne({_id: pid});
            if (result.deletedCount === 0) 
                throw new Error(`El producto ${pid} no existe!`);
            return result;
        } catch(error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }
}