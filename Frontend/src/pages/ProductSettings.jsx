import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5100/productos";

const ProductSettings = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    marca: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagenUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Obtener productos al cargar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      setProducts(res.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, form, { withCredentials: true });
      } else {
        await axios.post(API_URL, form, { withCredentials: true });
      }
      await fetchProducts();
      resetForm();
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      nombre: product.nombre,
      marca: product.marca,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      categoria: product.categoria,
      imagenUrl: product.imagen || "",  // aquí mapeas imagen a imagenUrl
    });
    setIsEditing(true);
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      nombre: "",
      marca: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      imagenUrl: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configuración de Productos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} className="p-2 border rounded" />
          <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} className="p-2 border rounded" required />
          <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="imagenUrl" placeholder="URL de la imagen" value={form.imagenUrl} onChange={handleChange} className="p-2 border rounded" />
        </div>
        <div className="flex justify-end space-x-2">
          {isEditing && (
            <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancelar
            </button>
          )}
          <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {isEditing ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </form>

      {/* Lista de productos */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Lista de productos</h3>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Marca</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Imagen</th>
              <th className="p-2 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2 border">{p.nombre}</td>
                <td className="p-2 border">{p.marca}</td>
                <td className="p-2 border">${p.precio}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border">{p.categoria}</td>
                <td className="p-2 border">
                  {p.imagen ? <img src={p.imagen} alt={p.nombre} className="w-10 h-10 object-cover" /> : "—"}
                </td>
                <td className="p-2 border text-center space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">No hay productos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSettings;
