import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administrador</h1>
      <p className="text-gray-700 mb-4">Bienvenido al panel de administración.</p>
      <h3 className="text-xl font-semibold mb-4">Gestión de Métodos de Pago</h3>
      <Link to="/admin/payment-methods" className="text-blue-600 hover:underline">
        Gestionar Métodos de Pago
      </Link>
    </div>
  );
};

export default Admin;
