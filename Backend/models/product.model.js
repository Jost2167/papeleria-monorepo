import Producto from '../schemas/product.schema.js';

class ProductoModel {
  
    async crear(data){
        return await Producto.create(data);
    }
        
    async obtenerTodos() {
        return await Producto.find();
    }

    async obtenerPorId(id) {
        return await Producto.findById(id);
    }

    async actualizar(id, data) {
        return await Producto.findByIdAndUpdate(id, data, { new: true });
      }
      
    async eliminar(id) {
        return await Producto.findByIdAndDelete(id);
    }    
}

export default new ProductoModel();
