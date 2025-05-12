/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice"; // Asegúrate de que addToCart esté correctamente importado
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'; // Asegúrate de que SweetAlert2 esté instalado correctamente

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));

    // Mostrar alerta bonita usando SweetAlert2
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: `Has agregado ${product.nombre} al carrito.`,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      background: '#f0f8ff',
      iconColor: '#1e90ff',
      customClass: {
        title: 'font-bold text-lg',
        content: 'text-base',
      },
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105">
        <img
          src={product.imagen} 
          alt={product.nombre} 
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold">{product.nombre}</h3>  
        <p className="text-gray-500">${product.precio}</p> 
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
        </div>
        <div
          className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600
                      group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all duration-100"
          onClick={(e) => handleAddToCart(e, product)}
        >
          <span className="group-hover:hidden">+</span>
          <span className="hidden group-hover:block">Agregar al carrito</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
