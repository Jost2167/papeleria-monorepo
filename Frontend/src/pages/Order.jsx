import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
const Order = ({order}) =>{
    const navigate = useNavigate()
    return(
        <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
            <h2 className="text-2xl font-semibold mb-4">Gracias por tu orden</h2>
            <p>Tu orden ha sido exitosa. Recibiras un email con la orden de compra.</p>
            <div className="mt-6 p-4 border rounded-lg bg-gray-100">
                <h3 className="text-lg font-semibold mb-2">Resumen de compra</h3>
                <p>Numero de compra: {order.orderNumber}</p>
                <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Informacion de envío</h4>
                    <p>{order.shippingInformation.address}</p>
                    <p>{order.shippingInformation.city}</p>
                    <p>{order.shippingInformation.zip}</p>
                </div>
                <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Productos pedidos</h4>
                    {order.products.map((product) => (
                        <div key={product.id}>
                            <p>{product.name} x {product.quantity}</p>
                            <p>{product.price * product.quantity}</p>
                        </div>    
                    ))}
                </div>
                <div className="mt-4 flex justify-between">
                    <span>Precio total:</span>
                    <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
                </div>
            </div>
            <div className="mt-6">
                <button className="bg-green-500 text-white py-2 px-4 hover:bg-green-600">Rastrear pedido</button>
                <button className="ml-4 bg-red-600 text-white py-2 px-4 hover:bg-red-800"
                onClick={()=>navigate('/')}
                >Continuar comprando</button>
            </div>
        </div>
    )
}

export default Order