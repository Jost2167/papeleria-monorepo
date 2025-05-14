/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = ({ setOrder }) => {
    const [shippingToggle, setShippingToggle] = useState(false);
    const [paymentToggle, setPaymentToggle] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const cart = useSelector(state => state.cart);

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        zip: ''
    });

    const navigate = useNavigate();

    const handleOrder = () => {
        const newOrder = {
            products: cart.products,
            orderNumber: "12344",
            shippingInformation: shippingInfo,
            totalPrice: cart.totalPrice
        };
        setOrder(newOrder);
        navigate('/order-confirmation');
    };

    return (
        <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
            <h3 className="text-2xl font-semibold mb-4">Verificar</h3>
            <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
                <div className="md:w-2/3">
                    {/* Información de envío (incluye factura) */}
                    <div className="border p-2 mb-6">
                        <div className="flex items-center justify-between"
                            onClick={() => setShippingToggle(!shippingToggle)}>
                            <h3 className="text-lg font-semibold mb-2">
                                Información de envío
                            </h3>
                            {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
                        </div>

                        <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Información de factura */}
                                <div>
                                    <label className="block text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Ingresa tu nombre"
                                        className="w-full px-3 py-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Ingresa tu Email"
                                        className="w-full px-3 py-2 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Número</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Ingresa tu teléfono"
                                        className="w-full px-3 py-2 border"
                                    />
                                </div>

                                {/* Información de envío */}
                                <div>
                                    <label className="block text-gray-700">Dirección</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Ingresa tu dirección"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Ciudad</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Ingresa tu ciudad"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Código postal</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        placeholder="Ingresa tu código postal"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* payment method */}
                    <div className="border p-2 mb-6">
                        <div className="flex items-center justify-between" onClick={() => setPaymentToggle(!paymentToggle)}>
                            <h3 className="text-lg font-semibold mb-2">Método de pago</h3>
                            {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
                        </div>

                        <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
                            {/* Pago contraentrega */}
                            <div className="flex items-center mb-2">
                                <input 
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "cod"}
                                    onChange={() => setPaymentMethod("cod")}
                                />
                                <label className="block text-gray-700 ml-2">Pago contraentrega</label>
                            </div>

                            {/* Tarjeta de débito */}
                            <div className="flex items-center mb-2">
                                <input 
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "dc"}
                                    onChange={() => setPaymentMethod("dc")}
                                />
                                <label className="block text-gray-700 ml-2">Tarjeta de débito</label>
                            </div>

                            {/* Transferencia bancaria */}
                            <div className="flex items-center mb-2">
                                <input 
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "bank"}
                                    onChange={() => setPaymentMethod("bank")}
                                />
                                <label className="block text-gray-700 ml-2">Transferencia bancaria</label>
                            </div>

                            {/* Tarjeta de débito form */}
                            {paymentMethod === "dc" && (
                                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                    <h3 className="text-xl font-semibold mb-4">Información de tarjeta de débito</h3>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Número de tarjeta
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa el número de tu tarjeta"
                                            className="border p-2 w-full rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Nombre del titular de la tarjeta
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa el nombre del titular de la tarjeta"
                                            className="border p-2 w-full rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <div className="w-1/2 mr-2">
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                Fecha de expiración
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="border p-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                        <div className="w-1/2 ml-2">
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="border p-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Transferencia bancaria form */}
                            {paymentMethod === "bank" && (
                                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                    <h3 className="text-xl font-semibold mb-4">Datos para transferencia</h3>
                                    <ul className="mb-4 text-gray-700 space-y-1 text-sm">
                                        <li><strong>Banco:</strong> Bancolombia S.A.</li>
                                        <li><strong>Tipo de cuenta:</strong> Ahorros</li>
                                        <li><strong>Número de cuenta:</strong> 1029384756</li>
                                        <li><strong>Código SWIFT:</strong> COLOCOBM</li>
                                        <li><strong>Nombre del titular:</strong> Mi Papeleria S.A.S.</li>
                                        <li><strong>NIT del titular:</strong> 900123456-7</li>
                                    </ul>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Subir comprobante de pago
                                        </label>
                                        <input 
                                            type="file"
                                            accept="image/*,application/pdf"
                                            className="border p-2 w-full rounded"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    console.log("Archivo subido:", file.name);
                                                    // Puedes guardar el archivo o validarlo aquí
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Order Summary */}
                <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-lg font-semibold mb-4">Resumen de la orden</h3>
                    <div className="space-y-4">
                        {cart.products.map(product => (
                            <div key={product.id} className="flex justify-between">
                                <div className="flex items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-contain rounded"
                                    />
                                    <div className="ml-4">
                                        <h4 className="text-md font-semibold">{product.name}</h4>
                                        <p className="text-gray-600">
                                            ${product.price} x {product.quantity}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-gray-800">
                                    ${product.price * product.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between">
                            <span>Precio total: </span>
                            <span className="font-semibold">
                                ${cart.totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <button
                        className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800"
                        onClick={handleOrder}
                    >
                        Realizar pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
