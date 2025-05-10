import productoModel from '../models/productoModel.js';

class ProductoController {

  async crearProducto(req, res) {
    try {
      const productoGuardado = await productoModel.crear(req.body);
      res.status(201).json(productoGuardado);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al crear producto', error });
    }
  }

  async obtenerProductos(req, res) {
    try {
      const productos = await productoModel.obtenerTodos();
  
      const productosFormateados = productos.map(p => ({
        id: p._id,
        nombre: p.nombre,
        marca: p.marca,
        descripcion: p.descripcion,
        precio: p.precio,
        stock:p.stock,
        imagen: p.imagenUrl,
        categoria: p.categoria,
      }));
  
      res.json(productosFormateados);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
  }
  
  async obtenerProductoPorId(req, res) {
    try {
      const producto = await productoModel.obtenerPorId(req.params.id);
      if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener producto' });
    }
  }

  async actualizarProducto(req, res) {
    try {
      const productoActualizado = await productoModel.actualizar(req.params.id, req.body);
      res.json(productoActualizado);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al actualizar producto' });
    }
  }

  async eliminarProducto(req, res) {
    try {
      await productoModel.eliminar(req.params.id);
      res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar producto' });
    }
  }
}

export default new ProductoController();
