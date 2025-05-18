import { Link } from 'react-router-dom';
import { FaCreditCard, FaCogs, FaShoppingCart } from 'react-icons/fa';

const Admin = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Panel de Administrador</h1>
        <p className="text-gray-600 mb-8 text-center">Bienvenido al panel de administración, donde puedes gestionar todos los aspectos de la tienda.</p>
        
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Configuraciones</h3>

        <div className="space-y-4">
          {/* Métodos de Pago */}
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaCreditCard className="text-blue-600 text-xl" />
              <span className="text-lg font-medium text-gray-800">Métodos de Pago</span>
            </div>
            <Link 
              to="/admin/payment-methods"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Gestionar
            </Link>
          </div>

          {/* Productos */}
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaCogs className="text-green-600 text-xl" />
              <span className="text-lg font-medium text-gray-800">Productos</span>
            </div>
            <Link 
              to="/admin/product-settings"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Gestionar
            </Link>
          </div>

          {/* Carrito de Compra (Rojo) */}
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaShoppingCart className="text-red-600 text-xl" />
              <span className="text-lg font-medium text-gray-800">Carrito de Compra</span>
            </div>
            <Link 
              to="/admin/orders"
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Gestionar
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
