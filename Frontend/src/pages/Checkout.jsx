/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "../components/StripeCheckout";

// ✅ Modal de error (componente dentro del mismo archivo)
const ErrorModal = ({ show, message, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
                <p className="text-gray-800 mb-6">{message}</p>
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

const Checkout = ({ setOrder }) => {
    const stripeRef = useRef();
    const [shippingToggle, setShippingToggle] = useState(false);
    const [paymentToggle, setPaymentToggle] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [paymentSettings, setPaymentSettings] = useState(null);

    const [shippingErrors, setShippingErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    });

    const [modalError, setModalError] = useState({ show: false, message: '' });

    const showErrorModal = (message) => {
        setModalError({ show: true, message });
    };

    const closeErrorModal = () => {
        setModalError({ show: false, message: '' });
    };

    const validators = {
        name: value => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(value) || "Nombre inválido",
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email inválido",
        phone: value => /^[0-9]{7,15}$/.test(value) || "Teléfono inválido",
        address: value => value.length >= 5 || "Dirección inválida",
        city: value => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(value) || "Ciudad inválida",
        zip: value => /^[0-9]{4,10}$/.test(value) || "Código postal inválido"
    };

    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    });

    const [bankFile, setBankFile] = useState(null);

    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentSettings = async () => {
            try {
                const response = await axios.get("http://localhost:5100/api/payment");
                const settings = response.data;

                if (settings.codEnabled) setPaymentMethod("cod");
                else if (settings.debitEnabled) setPaymentMethod("dc");
                else if (settings.bankTransferEnabled) setPaymentMethod("bank");

                setPaymentSettings(settings);
            } catch (error) {
                console.error("Error al obtener métodos de pago:", error);
            }
        };

        fetchPaymentSettings();
    }, []);

    const handleOrder = async() => {
        const { name, email, phone, address, city, zip } = shippingInfo;
    
        const newErrors = {
            name: validators.name(name) === true ? '' : validators.name(name),
            email: validators.email(email) === true ? '' : validators.email(email),
            phone: validators.phone(phone) === true ? '' : validators.phone(phone),
            address: validators.address(address) === true ? '' : validators.address(address),
            city: validators.city(city) === true ? '' : validators.city(city),
            zip: validators.zip(zip) === true ? '' : validators.zip(zip)
        };
        setShippingErrors(newErrors);
    
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (hasErrors) {
            showErrorModal("Por favor corrige los errores en el formulario de envío.");
            return;
        }
    
        if (paymentMethod === "dc") {
            const result = await stripeRef.current?.pay();
          
            if (result?.error) {
              showErrorModal(result.error.message);
              return;
            }
          
            if (result?.paymentIntent?.status !== "succeeded") {
              showErrorModal("El pago no fue exitoso. Intenta de nuevo.");
              return;
            }
        }  
    
        let bankProofUrl = "";

        if (paymentMethod === "bank") {
            const formData = new FormData();
            formData.append("file", bankFile);
            formData.append("upload_preset", "papeleria_comprobante");
            //formData.append("resource_type", "raw"); // 👈 Esto obliga a tratarlo como archivo crudo (PDF, DOC, etc.)

            try {
                
                const response = await axios.post("https://api.cloudinary.com/v1_1/dobicjr4v/auto/upload", formData);
                bankProofUrl = response.data.secure_url;
                console.log("Cloudinary response:", response.data);
            } catch (error) {
                console.error("Error al subir el comprobante:", error);
                showErrorModal("Error al subir el comprobante. Intenta nuevamente.");
                return;
            }
        }

        const newOrder = {
            products: cart.products,
            orderNumber: "12344",
            shippingInformation: shippingInfo,
            totalPrice: cart.totalPrice,
            paymentMethod,
            ...(paymentMethod === "bank" && { bankProof: bankProofUrl })
        };
    
        setOrder(newOrder);
        navigate('/order-confirmation');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            showErrorModal("Solo se permiten archivos de imagen (JPG, PNG, etc.)");
            return;
        }
        setBankFile(file);
    };
        
    if (!paymentSettings) {
        return <div className="text-center py-10 text-lg">Cargando métodos de pago...</div>;
    }

    return (
        <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
            <h3 className="text-2xl font-semibold mb-4">Verificar</h3>
            <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
                <div className="md:w-2/3">
                    {/* Información de envío */}
                    <div className="border p-2 mb-6">
                        <div className="flex items-center justify-between"
                            onClick={() => setShippingToggle(!shippingToggle)}>
                            <h3 className="text-lg font-semibold mb-2">Información de envío</h3>
                            {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
                        </div>

                        <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Nombre */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setShippingInfo(prev => ({ ...prev, name: value }));
                                            setShippingErrors(prev => ({ ...prev, name: validators.name(value) === true ? '' : validators.name(value) }));
                                        }}
                                    />
                                    {shippingErrors.name && <p className="text-red-600 text-sm">{shippingErrors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setShippingInfo(prev => ({ ...prev, email: value }));
                                            setShippingErrors(prev => ({ ...prev, email: validators.email(value) === true ? '' : validators.email(value) }));
                                        }}
                                    />
                                    {shippingErrors.email && <p className="text-red-600 text-sm">{shippingErrors.email}</p>}
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Teléfono"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setShippingInfo(prev => ({ ...prev, phone: value }));
                                            setShippingErrors(prev => ({ ...prev, phone: validators.phone(value) === true ? '' : validators.phone(value) }));
                                        }}
                                    />
                                    {shippingErrors.phone && <p className="text-red-600 text-sm">{shippingErrors.phone}</p>}
                                </div>

                                {/* Dirección */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Dirección"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setShippingInfo(prev => ({ ...prev, address: value }));
                                            setShippingErrors(prev => ({ ...prev, address: validators.address(value) === true ? '' : validators.address(value) }));
                                        }}
                                    />
                                    {shippingErrors.address && <p className="text-red-600 text-sm">{shippingErrors.address}</p>}
                                </div>

                                {/* Ciudad */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Ciudad"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setShippingInfo(prev => ({ ...prev, city: value }));
                                            setShippingErrors(prev => ({ ...prev, city: validators.city(value) === true ? '' : validators.city(value) }));
                                        }}
                                    />
                                    {shippingErrors.city && <p className="text-red-600 text-sm">{shippingErrors.city}</p>}
                                </div>

                                {/* Código Postal */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Código Postal"
                                        className="w-full px-3 py-2 border"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setShippingInfo(prev => ({ ...prev, zip: value }));
                                            setShippingErrors(prev => ({ ...prev, zip: validators.zip(value) === true ? '' : validators.zip(value) }));
                                        }}
                                    />
                                    {shippingErrors.zip && <p className="text-red-600 text-sm">{shippingErrors.zip}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Métodos de pago */}
                    <div className="border p-2 mb-6">
                        <div className="flex items-center justify-between" onClick={() => setPaymentToggle(!paymentToggle)}>
                            <h3 className="text-lg font-semibold mb-2">Método de pago</h3>
                            {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
                        </div>

                        <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
                            {paymentSettings.codEnabled && (
                                <div className="flex items-center mb-2">
                                    <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                                    <label className="block text-gray-700 ml-2">Pago contraentrega</label>
                                </div>
                            )}
                            {paymentSettings.debitEnabled && (
                                <div className="flex items-center mb-2">
                                    <input type="radio" name="payment" checked={paymentMethod === "dc"} onChange={() => setPaymentMethod("dc")} />
                                    <label className="block text-gray-700 ml-2">Tarjeta de débito</label>
                                </div>
                            )}
                            {paymentSettings.bankTransferEnabled && (
                                <div className="flex items-center mb-2">
                                    <input type="radio" name="payment" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />
                                    <label className="block text-gray-700 ml-2">Transferencia bancaria</label>
                                </div>
                            )}

                            {/* Tarjeta débito */}
                            {paymentMethod === "dc" && (
                            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                <h3 className="text-xl font-semibold mb-4">Pago con tarjeta</h3>
                                <StripeCheckout amount={cart.totalPrice} stripeRef={stripeRef} />
                            </div>
                            )}


                            {/* Transferencia bancaria */}
                            {paymentMethod === "bank" && paymentSettings.bankTransferDetails && (
                                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                    <h3 className="text-xl font-semibold mb-4">Datos para transferencia</h3>
                                    <ul className="mb-4 text-gray-700 space-y-1 text-sm">
                                        <li><strong>Banco:</strong> {paymentSettings.bankTransferDetails.bankName}</li>
                                        <li><strong>Tipo de cuenta:</strong> {paymentSettings.bankTransferDetails.accountType}</li>
                                        <li><strong>Número de cuenta:</strong> {paymentSettings.bankTransferDetails.accountNumber}</li>
                                        <li><strong>Código SWIFT:</strong> {paymentSettings.bankTransferDetails.swiftCode}</li>
                                        <li><strong>Nombre del titular:</strong> {paymentSettings.bankTransferDetails.accountHolderName}</li>
                                        <li><strong>NIT del titular:</strong> {paymentSettings.bankTransferDetails.accountHolderNIT}</li>
                                    </ul>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Subir comprobante de pago</label>
                                        <input
                                        type="file"
                                        accept="image/*"
                                        className="border p-2 w-full rounded"
                                        onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resumen */}
                <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-lg font-semibold mb-4">Resumen de la orden</h3>
                    <div className="space-y-4">
                        {cart.products.map(product => (
                            <div key={product.id} className="flex justify-between">
                                <div className="flex items-center">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded" />
                                    <div className="ml-4">
                                        <h4 className="text-md font-semibold">{product.name}</h4>
                                        <p className="text-gray-600">${product.price} x {product.quantity}</p>
                                    </div>
                                </div>
                                <div className="text-gray-800">${product.price * product.quantity}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between">
                            <span>Precio total:</span>
                            <span className="font-semibold">${cart.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800"
                        onClick={handleOrder}
                    >
                        Realizar pedido
                    </button>

                    <ErrorModal show={modalError.show} message={modalError.message} onClose={closeErrorModal} />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
