import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../assets/Images/emptycart.png";
import { FaTrashAlt } from "react-icons/fa";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Modal de alerta
const AlertModal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg text-center">{message}</h3>
                <div className="mt-4 text-center">
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const isLoggedIn = user?.isLoggedIn;  // Verificamos si el usuario está logueado
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);  // Estado para mostrar el modal de alerta

    const handleSaveCart = async () => {
        if (!isLoggedIn) {
            setShowAlert(true);  // Muestra el modal si el usuario no está logueado
            return;
        }

        try {
            const cartId = localStorage.getItem("cartId");
            const method = cartId ? "PUT" : "POST";
            const endpoint = cartId
                ? `http://localhost:5100/api/cart/save/${cartId}`
                : "http://localhost:5100/api/cart/save";

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cart),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Error al guardar el carrito");
            }

            if (!cartId && data.cartId) {
                localStorage.setItem("cartId", data.cartId);
            }

            navigate("/checkout");
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
            alert("Hubo un problema guardando tu carrito. Intenta nuevamente.");
        }
    };

    return (
        <div className="h-[90vh] container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
            {cart.products.length > 0 ? (
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Carrito de compras</h3>
                    <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10 mt-8">
                        <div className="md:w-2/3">
                            <div className="flex justify-between border-b items-center mb-4 text-xs font-bold">
                                <p>PRODUCTOS</p>
                                <div className="flex space-x-8">
                                    <p>PRECIO</p>
                                    <p>CANTIDAD</p>
                                    <p>SUBTOTAL</p>
                                    <p>BORRAR</p>
                                </div>
                            </div>

                            {cart.products.map((product, index) => (
                                <div key={product.id || `${product.name}-${index}`} className="flex items-center justify-between p-3 border-b">
                                    <div className="flex items-center space-x-4">
                                        <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded" />
                                        <div className="flex-1 ml-4">
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                        </div>
                                    </div>
                                    <div className="flex space-x-12 items-center">
                                        <p>${product.price}</p>
                                        <div className="flex items-center border">
                                            <button className="text-xl font-bold px-2 border-r" onClick={() => dispatch(decreaseQuantity(product.id))}>-</button>
                                            <p className="text-xl px-4">{product.quantity}</p>
                                            <button className="text-xl px-2 border-l" onClick={() => dispatch(increaseQuantity(product.id))}>+</button>
                                        </div>
                                        <p>${(product.quantity * product.price).toFixed(2)}</p>
                                        <button className="text-red-500 hover:text-red-700" onClick={() => dispatch(removeFromCart(product.id))}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border mt-6 md:mt-0">
                            <h3 className="text-sm font-semibold mb-5">TOTAL CARRITO</h3>
                            <div className="flex justify-between mb-5 border-b pb-1">
                                <span className="text-sm">ITEMS TOTALES:</span>
                                <span>{cart.totalQuantity}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span>Precio total: </span>
                                <span>${cart.totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-red-600 text-white py-2 hover:bg-red-800" onClick={handleSaveCart}>
                                Guardar Carrito
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <img src={EmptyCart} alt="Empty Cart" className="h-96" />
                </div>
            )}

            {/* Mostrar el modal si el usuario no está logueado */}
            {showAlert && (
                <AlertModal 
                    message="Inicia sesión para guardar el carrito" 
                    onClose={() => setShowAlert(false)} 
                />
            )}
        </div>
    );
};

export default Cart;
