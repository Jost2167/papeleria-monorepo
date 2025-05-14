import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBook, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Modal from "./Modal";
import { setSearchTerm } from "../redux/productSlice";
import { logOutUser } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice"; // ✅ Importa la acción para vaciar el carrito

const Navbar = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [search, setSearch] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(search));
        navigate('/filter-data');
    };

    const openSignUp = () => {
        setIsLogin(false);
        setIsModelOpen(true);
    };

    const openLogin = () => {
        setIsLogin(true);
        setIsModelOpen(true);
    };

    const products = useSelector(state => state.cart.products);
    const user = useSelector(state => state.user);
    const isLoggedIn = user?.isLoggedIn;

    // ✅ Función de cerrar sesión con vaciado del carrito
    const handleLogout = () => {
        dispatch(clearCart());         // 🔥 Vaciar el carrito del Redux state
        dispatch(logOutUser());        // Cerrar sesión del usuario
        setIsModelOpen(false);         // Cerrar modal si estaba abierto
        navigate('/');                 // Redirigir al inicio
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
                <div className="text-lg font-bold flex items-center space-x-2">
                    <FaBook className="text-2xl text-blue-700" />
                    <Link to="/">Papelería</Link>
                </div>
                <div className="relative flex-1 mx-4">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            className="w-full border py-2 px-4"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute top-3 right-3 text-red-500" />
                    </form>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative">
                        <FaShoppingCart className="text-lg" />
                        {products.length > 0 && (
                            <span className="absolute top-0 text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white">
                                {products.length}
                            </span>
                        )}
                    </Link>

                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-semibold">Hola, {user.name}</span>
                            <button onClick={handleLogout} className="text-sm text-red-600 flex items-center">
                                <FaSignOutAlt className="mr-1" /> Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <button className="hidden md:block" onClick={() => setIsModelOpen(true)}>
                            Iniciar | Registrarse
                        </button>
                    )}

                    <button className="block md:hidden">
                        <FaUser />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
            <Link to="/" className="hover:underline">Inicio</Link>
            <Link to="/shop" className="hover:underline">Tienda</Link>
            <Link to="/Contact" className="hover:underline">Contacto</Link>
            <Link to="/aboutus" className="hover:underline">Nosotros</Link>
            <Link to="/libreriaapi" className="hover:underline">LibreriaAPI</Link>

            {/* Condición para mostrar enlace solo si el usuario es admin */}
            {user?.role === 'admin' && (
                <Link to="/admin" className="hover:underline">Admin</Link>
            )}
            </div>



            <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
                {isLogin ? <Login openSignUp={openSignUp} setIsModelOpen={setIsModelOpen} /> : <Register openLogin={openLogin} />}
            </Modal>
        </nav>
    );
};

export default Navbar;
