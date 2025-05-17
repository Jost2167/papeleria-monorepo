import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
const Order = ({ order }) => {
  const navigate = useNavigate()

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price)

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-green-600 mb-4">¡Gracias por tu orden!</h2>
        <p className="text-gray-700 mb-6">
          Tu orden ha sido procesada exitosamente. Pronto recibirás un correo con los detalles.
        </p>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Resumen de compra</h3>

          {/* Información de envío */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Información de envío</h4>
            <div className="text-gray-600 space-y-1">
              <p>{order.shippingInformation.address}</p>
              <p>{order.shippingInformation.city}</p>
              <p>{order.shippingInformation.zip}</p>
            </div>
          </div>

          {/* Productos pedidos */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Productos pedidos</h4>
            <div className="space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">Cantidad: {product.quantity}</p>
                  </div>
                  <div className="text-right text-gray-700 font-semibold">
                    {formatPrice(product.price * product.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-4">
            <span>Total a pagar:</span>
            <span>{formatPrice(order.totalPrice)}</span>
          </div>
        </div>

        {/* Botón para continuar */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  )
}

export default Order
