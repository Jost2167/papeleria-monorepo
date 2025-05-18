import { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  pendiente: "bg-yellow-100 text-yellow-800",
  enviado: "bg-blue-100 text-blue-800",
  entregado: "bg-green-100 text-green-800",
};

const statusOptions = ["pendiente", "enviado", "entregado"];

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5100/api/orders", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error al obtener órdenes:", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5100/api/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (err) {
      console.error("Error al actualizar el estado:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Órdenes</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No hay órdenes registradas.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100 border-b text-gray-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Productos</th>
                <th className="p-3">Cliente / Envío</th>
                <th className="p-3">Pago</th>
                <th className="p-3">Total</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Fecha</th>
                <th className="p-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-xs text-gray-500">{order._id.slice(-6)}</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside text-gray-800">
                      {order.products.map((p, i) => (
                        <li key={i}>
                          {p.name} <span className="text-sm text-gray-500">x{p.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    <p className="font-medium">{order.shippingInformation.name}</p>
                    <p>{order.shippingInformation.email}</p>
                    <p className="text-gray-500">
                      {order.shippingInformation.address}, {order.shippingInformation.city}
                    </p>
                  </td>
                  <td className="p-3 text-sm">
                    {order.paymentMethod === "cod" && "Contra entrega"}
                    {order.paymentMethod === "dc" && "Débito/Crédito"}
                    {order.paymentMethod === "bank" && (
                      <div>
                        Transferencia
                        {order.bankProof && (
                          <a
                            href={order.bankProof}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-xs block"
                          >
                            Ver comprobante
                          </a>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-green-600">${order.totalPrice}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}<br />
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="p-3 flex gap-2 justify-center items-center">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setSelectedOrderId(order._id);
                        setShowModal(true);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                      title="Eliminar orden"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">¿Eliminar esta orden?</h3>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminarla?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    await axios.delete(`http://localhost:5100/api/orders/${selectedOrderId}`, {
                      withCredentials: true,
                    });
                    setShowModal(false);
                    setSelectedOrderId(null);
                    fetchOrders();
                  } catch (err) {
                    console.error("Error al eliminar la orden:", err);
                  }
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
